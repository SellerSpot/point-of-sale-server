import Joi from 'joi';
import { commonJoiSchemas } from 'utilities';

/**
 * Validation for getting a single product from database
 */
export const getSingleProductValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
});

/**
 * Validation for creating a product in database
 */
export const createProductValidationSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    gtinNumber: Joi.string(),
    mrpPrice: Joi.number(),
    landingPrice: Joi.number(),
    sellingPrice: Joi.number(),
    stockInformation: Joi.object({
        availableStock: Joi.number().required(),
        stockUnit: Joi.string().required(),
    }),
    profitPercent: Joi.number(),
    taxBracket: Joi.array().items(Joi.string()),
});

/**
 * Validation for updating a product in database
 */
export const updateProductValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
    productData: createProductValidationSchema.required(),
});

/**
 * Validation for deleting a product in database
 */
export const deleteProductValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
});

/**
 * Validation for search for a product in database
 */
export const searchProductValidationSchema = Joi.object({
    query: Joi.string().required(),
});
