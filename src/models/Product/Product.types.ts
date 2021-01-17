import Joi from 'joi';
import { Model, Document } from 'mongoose';
import { commonJoiSchemas } from '../../utils';
import { IGetBrands } from '../Brand/Brand.types';
import { IGetCategory } from '../Category/Category.types';
import { IGetStockUnit } from '../StockUnit/StockUnit.types';
import { IGetTaxBracket } from '../TaxBracket/TaxBracket.types';

/**
 * Manually synced interface of the Product database model
 * @use - to provide intellisense when perfoming database operations in controllers
 */
export interface IProduct {
    name: string;
    category: IGetCategory;
    brand: IGetBrands;
    gtinNumber?: string;
    mrpPrice?: number;
    landingPrice?: number;
    sellingPrice: number;
    stockInformation: {
        availableStock: number;
        stockUnit: IGetStockUnit;
    };
    profitPercent?: number;
    taxBracket: IGetTaxBracket[];
}

/**
 * Creating a model object to use with the IProduct interface to get intellisense in controllers
 */
export type IProductModel = Model<IProduct & Document>;

/**
 * Basic interface fo the return data from the products controller
 */
export interface IResponse {
    status: boolean;
    statusCode: number;
    data?: IGetProduct[] | IGetProduct | string;
    error?: {
        fieldName: string;
        message: string;
    }[];
}

/**
 * Interface for return data of GET operation to GET ALL PRODUCTS
 */
export interface IGetProduct {
    _id: string;
    name: string;
    category: IGetCategory;
    brand: IGetBrands;
    gtinNumber: string;
    mrpPrice: number;
    landingPrice: number;
    sellingPrice: number;
    stockInformation: {
        availableStock: number;
        stockUnit: IGetStockUnit;
    };
    profitPercent: number;
    taxBracket: IGetTaxBracket[];
}

/**
 * Interface for the POST data sent to server to ADD PRODUCT
 */
export interface IPostCreateProduct {
    name: string;
    gtinNumber: string;
    category: string;
    brand: string;
    landingPrice: number;
    profitPercent: number;
    sellingPrice: number;
    availableStock: number;
    stockUnit: string;
    taxBracket: string[];
}

/**
 * POST request body scheme for AddProduct api
 */
export const addProductRequestBodySchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Name must be a string',
        'any.required': 'Name is required',
    }),
    category: commonJoiSchemas.MONGODBID.required().messages({
        'string.base': 'Category must be a string',
        'any.required': 'Category is required',
    }),
    brand: commonJoiSchemas.MONGODBID.required().allow('').messages({
        'string.base': 'Brand must be a string',
        'any.required': 'Brand is required',
    }),
    gtinNumber: Joi.string().allow('').messages({
        'string.base': 'GTIN number must be a string',
    }),
    mrpPrice: Joi.number().min(0).messages({
        'number.base': 'MRP must be a number',
        'number.min': 'MRP should be greater than zero',
    }),
    landingPrice: Joi.number().min(0).messages({
        'number.base': 'Landing Price must be a number',
        'number.min': 'Landing Price should be greater than zero',
    }),
    sellingPrice: Joi.number().min(0).messages({
        'number.base': 'Selling Price must be a number',
        'number.min': 'Selling Price should be greater than zero',
    }),
    stockInformation: Joi.object({
        availableStock: Joi.number().min(0).required().messages({
            'number.base': 'Available Stock must be a number',
            'number.min': 'Available Stock should be greater than zero',
            'any.required': 'Available Stock is required',
        }),
        stockUnit: commonJoiSchemas.MONGODBID.required().messages({
            'string.base': 'Stock Unit must be a string',
            'any.required': 'Stock Unit is required',
        }),
    }),
    profitPercent: Joi.number().min(-100).max(100).required().messages({
        'number.base': 'Profit Percent must be a number',
        'number.min': 'Profit Percent must be greater than zero',
        'number.max': 'Profit Percent must be lesser than 100',
        'any.required': 'Profit Percent is required',
    }),
    taxBracket: Joi.array().items(commonJoiSchemas.MONGODBID),
});
