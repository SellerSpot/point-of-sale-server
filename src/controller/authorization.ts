import jwt from 'jsonwebtoken';
import { appDbModels, baseDbModels, DB_NAMES, MONGOOSE_MODELS } from '@sellerspot/database-models';
import { CONFIG } from 'config/config';

interface IAuthorizeTenantRequest {
    domainName: string;
}

interface IAuthorizeTenantResponse {
    status: boolean;
    statusCode: number;
    data?: { tenantAppToken: string; name: string; _id: string };
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

        const { _id, email, name } = <baseDbModels.TenantModel.ITenant>installedTenant.tenant;

        return Promise.resolve({
            status: true,
            statusCode: 200,
            data: {
                _id,
                name,
                email,
                tenantAppToken: jwt.sign({ _id, email, name }, CONFIG.APP_SECRET, {
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
