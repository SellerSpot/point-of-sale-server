import { appDbModels, baseDbModels, DB_NAMES, MONGOOSE_MODELS } from '@sellerspot/database-models';
import { pointOfSaleTypes, STATUS_CODES } from '@sellerspot/universal-types';
import { CONFIG } from 'config/config';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Socket } from 'socket.io';
import { joiSchemaOptions } from 'utilities';
import {
    authenticateUserValidationSchema,
    authorizeTenantValidationSchema,
    verifyTokenValidationSchema,
} from './authorization.validation';

/**
 * authorize tenant - by giving back token including the tenant verification payload (except auth payload - that will be sent using authenticateUser controller)
 */
export const authorizeTenant = async (
    data: pointOfSaleTypes.authRequestTypes.IAuthorizeTenantRequest,
): Promise<pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse> => {
    try {
        // validating input data
        const { error } = authorizeTenantValidationSchema.validate(data, joiSchemaOptions);
        if (!error) {
            const tokenPayload: pointOfSaleTypes.authResponseTypes.ITokenPayload = {
                email: 'developer@gmail.com',
                name: 'Developer',
                _id: 'developer_id',
            };
            if (data.domainName !== 'localhost') {
                // check subdomain exists on basedb subdomain models
                const baseDb = global.currentDb.useDb(DB_NAMES.BASE_DB);
                // tenant model here for population purpose
                const TenantModel: baseDbModels.TenantModel.ITenantModel = baseDb.model(
                    MONGOOSE_MODELS.BASE_DB.TENANT,
                );
                const SubDomainModel: baseDbModels.SubDomainModel.ISubDomainModel = baseDb.model(
                    MONGOOSE_MODELS.BASE_DB.SUB_DOMAIN,
                );
                const tenantSubDomain = await SubDomainModel.findOne({
                    domainName: data.domainName,
                });
                if (!tenantSubDomain) {
                    throw {
                        status: false,
                        statusCode: STATUS_CODES.NOT_FOUND,
                        error: 'Invalid tenant',
                    };
                }
                // check app installed on pos db
                const posDb = global.currentDb.useDb(DB_NAMES.POINT_OF_SALE_DB);
                const InstalledTenantModel: appDbModels.InstalledTenantModel.IInstalledTenantModel = posDb.model(
                    MONGOOSE_MODELS.APP_DB.INSTALLED_TENANT,
                );
                const installedTenant = await InstalledTenantModel.findOne({
                    tenant: tenantSubDomain.tenant,
                }).populate('tenant', null, TenantModel);

                if (!installedTenant)
                    throw <pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse>{
                        status: false,
                        statusCode: STATUS_CODES.NOT_FOUND,
                        error: 'Tenant not found in installed app.',
                    };

                const tenantDetails = <baseDbModels.TenantModel.ITenant>installedTenant.tenant;
                tokenPayload._id = tenantDetails._id;
                tokenPayload.email = tenantDetails.email;
                tokenPayload.name = tenantDetails.name;
                // auth will be handled in  separate block
            }

            const responseData: pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse['data'] = {
                ...tokenPayload,
                token: jwt.sign(tokenPayload, CONFIG.APP_SECRET, {
                    expiresIn: '2 days', // check zeit/ms
                }),
            };

            return Promise.resolve({
                status: true,
                statusCode: STATUS_CODES.OK,
                data: responseData,
            });
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.BAD_REQUEST,
                error: 'Please verify request parameters',
            };
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * authenticate tenant - by giving back token including the tenant verification payload
 */
export const authenticateUser = async (
    data: pointOfSaleTypes.authRequestTypes.IAuthenticateUserRequest & { tenantId: string }, // tenantId parsed from token payload in req/socket object.
): Promise<pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse> => {
    try {
        // validating input data
        const { error } = authenticateUserValidationSchema.validate(data, joiSchemaOptions);
        if (!error) {
            const tokenPayload: pointOfSaleTypes.authResponseTypes.ITokenPayload = {
                email: 'developer@gmail.com',
                name: 'Developer',
                _id: 'developer_id',
                auth: {
                    // in localhost auth user is same as tenant
                    email: 'developer@gmail.com',
                    name: 'Developer',
                    _id: 'developer_id',
                },
            };
            if (data.tenantId !== 'developer_id') {
                // checking on tenantId's userName passowrd for now, later user management is implemented tenantDb will be queried for authenticating employees
                // baseDb reference
                const baseDb = global.currentDb.useDb(DB_NAMES.BASE_DB);
                // tenant model here for population purpose
                const TenantModel: baseDbModels.TenantModel.ITenantModel = baseDb.model(
                    MONGOOSE_MODELS.BASE_DB.TENANT,
                );
                const tenant = await TenantModel.findById(data.tenantId);
                if (!tenant) {
                    throw {
                        status: false,
                        statusCode: STATUS_CODES.NOT_FOUND,
                        error: 'Invalid tenant',
                    };
                }
                if (bcrypt.compareSync(data.password, tenant.password)) {
                    tokenPayload._id = tenant._id;
                    tokenPayload.email = tenant.email;
                    tokenPayload.name = tenant.name;
                    // for now same as tenant - later need to integrate userMangement model here
                    tokenPayload.auth._id = tenant._id;
                    tokenPayload.auth.email = tenant.email;
                    tokenPayload.auth.name = tenant.name;
                } else {
                    throw {
                        status: false,
                        statusCode: STATUS_CODES.UNAUTHORIZED,
                        error: 'Authentication Failed, Check email or password / contact admin.',
                    };
                }
            }

            const responseData: pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse['data'] = {
                ...tokenPayload,
                token: jwt.sign(tokenPayload, CONFIG.APP_SECRET, {
                    expiresIn: '2 days', // check zeit/ms
                }),
            };

            return Promise.resolve({
                status: true,
                statusCode: STATUS_CODES.OK,
                data: responseData,
            });
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.BAD_REQUEST,
                error: 'Please verify request parameters',
            };
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export const verifyToken = async (
    token: string,
): Promise<pointOfSaleTypes.authResponseTypes.IVerifyTokenResponse> => {
    try {
        const { error } = verifyTokenValidationSchema.validate(token, joiSchemaOptions);
        if (!error) {
            const response: pointOfSaleTypes.authResponseTypes.IVerifyTokenResponse = await new Promise(
                (resolve, reject) =>
                    jwt.verify(
                        token,
                        CONFIG.APP_SECRET,
                        (err, decoded: pointOfSaleTypes.authResponseTypes.ITokenPayload) => {
                            if (err) {
                                reject('tokenExpired');
                            }
                            const tokenResponse: pointOfSaleTypes.authResponseTypes.IVerifyTokenResponse = {
                                status: true,
                                statusCode: STATUS_CODES.OK,
                                data: decoded,
                            };
                            // on verificaiton success
                            resolve(tokenResponse);
                        },
                    ),
            );
            return Promise.resolve(response);
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.BAD_REQUEST,
                error: 'Please verify authentication parameters',
            };
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getToken = (entity: Request | Socket, type: 'express' | 'axios' = 'axios'): string => {
    let token = null;
    if (type === 'axios') {
        token = (<Request>entity).headers?.authorization?.split(' ')?.[1] ?? null; // here the authorizationToken will look like this `Bearer <token-string>` from which we split and take the token string alone.
    } else {
        const socketAuthObject = (<Socket>entity).handshake.auth as { token: string };
        token = socketAuthObject?.token ?? null;
    }

    return token;
};
