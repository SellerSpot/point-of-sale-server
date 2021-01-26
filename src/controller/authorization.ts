import jwt from 'jsonwebtoken';
import { appDbModels, baseDbModels, DB_NAMES, MONGOOSE_MODELS } from '@sellerspot/database-models';
import { CONFIG } from 'config/config';

interface IAuthorizeTenantRequest {
    domainName: string;
}

interface ITokenPayload {
    name?: string;
    email?: string;
}

interface IAuthorizeTenantResponse {
    status: boolean;
    statusCode: number;
    data?: ITokenPayload & { tenantAppToken: string };
    error?: unknown;
}

export const authorizeTenant = async (
    data: IAuthorizeTenantRequest,
): Promise<IAuthorizeTenantResponse> => {
    try {
        if (!data.domainName) throw 'Invalid Data';
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

        const { email, name } = <baseDbModels.TenantModel.ITenant>installedTenant.tenant;
        const tokenPayload: ITokenPayload = { email, name };

        return Promise.resolve({
            status: true,
            statusCode: 200,
            data: {
                ...tokenPayload,
                tenantAppToken: jwt.sign(tokenPayload, CONFIG.APP_SECRET, {
                    expiresIn: '2 days', // check zeit/ms
                }),
            },
        });
    } catch (error) {
        return Promise.reject({
            status: false,
            statusCode: 400,
            error: {
                tenantAuthorizationFailure: 'bad request!' + JSON.stringify(error.message ?? error),
            },
        });
    }
    return;
};

interface IVerifyTokenResponse {
    status: boolean;
    statusCode: number;
    data?: ITokenPayload;
    error?: unknown;
}

export const verifyToken = async (token: string): Promise<IVerifyTokenResponse> => {
    try {
        if (!token) {
            throw 'tokenNotFound';
        }
        const response: IVerifyTokenResponse = await new Promise((resolve, reject) =>
            jwt.verify(token, CONFIG.APP_SECRET, (err, decoded: ITokenPayload) => {
                if (err) {
                    reject('tokenExpired');
                }
                // on verificaiton success
                resolve({
                    status: true,
                    statusCode: 200,
                    data: decoded,
                } as IVerifyTokenResponse);
            }),
        );
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject({
            status: false,
            statusCode: 400,
            error: {
                tokenVerificationFailure: JSON.stringify(error.message ?? error),
            },
        });
    }
};
