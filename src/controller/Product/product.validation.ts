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
