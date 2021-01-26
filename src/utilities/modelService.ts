import { Connection } from 'mongoose';
import { MONGOOSE_MODELS, tenantDbModels } from '@sellerspot/database-models';

export const getBrandModel = (
    currentDb: Connection,
): tenantDbModels.pointOfSaleModels.BrandModel.IBrandModel => {
    return currentDb.model(MONGOOSE_MODELS.TENANT_DB.POINT_OF_SALE.BRAND);
};

export const getCategoryModel = (
    currentDb: Connection,
): tenantDbModels.pointOfSaleModels.CategoryModel.ICategoryModel => {
    return currentDb.model(MONGOOSE_MODELS.TENANT_DB.POINT_OF_SALE.CATEGORY);
};

export const getProductModel = (
    currentDb: Connection,
): tenantDbModels.pointOfSaleModels.ProductModel.IProductModel => {
    return currentDb.model(MONGOOSE_MODELS.TENANT_DB.POINT_OF_SALE.PRODUCT);
};

export const getSaleModel = (
    currentDb: Connection,
): tenantDbModels.pointOfSaleModels.SaleModel.ISaleModel => {
    return currentDb.model(MONGOOSE_MODELS.TENANT_DB.POINT_OF_SALE.SALE);
};

export const getStockUnitModel = (
    currentDb: Connection,
): tenantDbModels.pointOfSaleModels.StockUnitModel.IStockUnitModel => {
    return currentDb.model(MONGOOSE_MODELS.TENANT_DB.POINT_OF_SALE.STOCKUNIT);
};

export const getTaxBracketModel = (
    currentDb: Connection,
): tenantDbModels.pointOfSaleModels.TaxBracketModel.ITaxBracketModel => {
    return currentDb.model(MONGOOSE_MODELS.TENANT_DB.POINT_OF_SALE.TAXBRACKET);
};
