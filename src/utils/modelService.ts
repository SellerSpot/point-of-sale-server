import { Connection } from 'mongoose';
import {
    BrandModelTypes,
    CategoryModelTypes,
    ProductModelTypes,
    SaleModelTypes,
    StockUnitModelTypes,
    TaxBracketModelTypes,
} from '../models';

import { EMODELS } from '../models/models.types';

export const getBrandModel = (currentDb: Connection = global.currentDb): BrandModelTypes.IBrandModel => {
    return currentDb.model(EMODELS.BRAND);
};

export const getCategoryModel = (currentDb: Connection = global.currentDb): CategoryModelTypes.ICategoryModel => {
    return currentDb.model(EMODELS.CATEGORY);
};

export const getProductModel = (currentDb: Connection = global.currentDb): ProductModelTypes.IProductModel => {
    return currentDb.model(EMODELS.PRODUCT);
};

export const getSaleModel = (currentDb: Connection = global.currentDb): SaleModelTypes.ISaleModel => {
    return currentDb.model(EMODELS.SALE);
};

export const getStockUnitModel = (currentDb: Connection = global.currentDb): StockUnitModelTypes.IStockUnitModel => {
    return currentDb.model(EMODELS.STOCKUNIT);
};

export const getTaxBracketModel = (currentDb: Connection = global.currentDb): TaxBracketModelTypes.ITaxBracketModel => {
    return currentDb.model(EMODELS.TAXBRACKET);
};
