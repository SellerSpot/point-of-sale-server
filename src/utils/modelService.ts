import { Connection } from 'mongoose';
import { BrandModel, CategoryModel, ProductModel, SaleModel, StockUnitModel, TaxBracketModel } from '../models';
import { EMODELS } from '../models/models.types';

export const getBrandModel = (currentDb: Connection = global.currentDb): BrandModel.IBrandModel => {
    return currentDb.model(EMODELS.BRAND);
};

export const getCategoryModel = (currentDb: Connection = global.currentDb): CategoryModel.ICategoryModel => {
    return currentDb.model(EMODELS.CATEGORY);
};

export const getProductModel = (currentDb: Connection = global.currentDb): ProductModel.IProductModel => {
    return currentDb.model(EMODELS.PRODUCT);
};

export const getSaleModel = (currentDb: Connection = global.currentDb): SaleModel.ISaleModel => {
    return currentDb.model(EMODELS.SALE);
};

export const getStockUnitModel = (currentDb: Connection = global.currentDb): StockUnitModel.IStockUnitModel => {
    return currentDb.model(EMODELS.STOCKUNIT);
};

export const getTaxBracketModel = (currentDb: Connection = global.currentDb): TaxBracketModel.ITaxBracketModel => {
    return currentDb.model(EMODELS.TAXBRACKET);
};
