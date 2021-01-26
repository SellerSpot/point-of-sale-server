import { appDbModels, baseDbModels, DB_NAMES, MONGOOSE_MODELS } from '@sellerspot/database-models';

interface IAuthorizeTenantRequest {
    domainName: string;
}

interface IAuthorizeTenantResponse {
    status: boolean;
    statusCode: number;
    data?: { tenantAppToken: string; name: string; id: string };
    error?: unknown;
}

export const authorizeTenant = async (
    data: IAuthorizeTenantRequest,
): Promise<IAuthorizeTenantResponse> => {
    try {
        if (!data.domainName) throw 'Invalid Data';
        const baseDb = global.currentDb.useDb(DB_NAMES.BASE_DB);
        const SubDomainModel: baseDbModels.SubDomainModel.ISubDomainModel = baseDb.model(
            MONGOOSE_MODELS.BASE_DB.SUB_DOMAIN,
        );
        const tenantSubDomain = await SubDomainModel.findOne({ domainName: data.domainName });
        if (!tenantSubDomain) throw 'Invalid Tenant';
        // const posDb = global.currentDb.useDb(DB_NAMES.POINT_OF_SALE_DB);
        // const InstalledTenantModel: appDbModels.InstalledTenantModel.IInstalledTenantModel = posDb.model(
        //     MONGOOSE_MODELS.APP_DB.INSTALLED_TENANT,
        // );
        // const installedTenant = InstalledTenantModel.findOne({tenant: tenantSubDomain. })

        return Promise.resolve({
            status: true,
            statusCode: 200,
            data: {
                id: '',
                name: '',
                tenantAppToken: '',
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
