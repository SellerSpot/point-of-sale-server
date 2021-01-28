import jwt from 'jsonwebtoken';
import { appDbModels, baseDbModels, DB_NAMES, MONGOOSE_MODELS } from '@sellerspot/database-models';
import { pointOfSaleTypes, STATUS_CODES } from '@sellerspot/universal-types';
import { CONFIG } from 'config/config';
import { Request, response } from 'express';
import { Socket } from 'socket.io';
import { logger } from 'utilities/logger';

export const authorizeTenant = async (
    data: pointOfSaleTypes.authRequestTypes.IAuthorizeTenantRequest,
): Promise<pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse> => {
    try {
        if (!data.domainName) throw 'Invalid Data';

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
            if (!tenantSubDomain) throw 'Invalid Tenant';

            // check app installed on pos db
            const posDb = global.currentDb.useDb(DB_NAMES.POINT_OF_SALE_DB);
            const InstalledTenantModel: appDbModels.InstalledTenantModel.IInstalledTenantModel = posDb.model(
                MONGOOSE_MODELS.APP_DB.INSTALLED_TENANT,
            );
            const installedTenant = await InstalledTenantModel.findOne({
                tenant: tenantSubDomain.tenant,
            }).populate('tenant', null, TenantModel);

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
    } catch (error) {
        return Promise.reject(<pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse>{
            status: false,
            statusCode: STATUS_CODES.BAD_REQUEST,
            error: 'bad request!' + JSON.stringify(error.message ?? error),
        });
    }
};

export const verifyToken = async (
    token: string,
): Promise<pointOfSaleTypes.authResponseTypes.IVerifyTokenResponse> => {
    try {
        if (!token) {
            throw 'tokenNotFound';
        }
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
    } catch (error) {
        return Promise.reject(<pointOfSaleTypes.authResponseTypes.IVerifyTokenResponse>{
            status: false,
            statusCode: 400,
            error: JSON.stringify(error.message ?? error),
        });
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
