import Joi from 'joi';
import { commonJoiSchemas } from 'utilities';

/**
 * Validation for getting a single brand from database
 */
export const getSingleBrandValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
});

/**
 * Validation for creating a brand in database
 */
export const createBrandValidationSchema = Joi.object({
    name: Joi.string().required(),
});

/**
 * Validation for updating a brand in database
 */
export const updateBrandValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
    brandData: createBrandValidationSchema.required(),
});

/**
 * Validation for deleting a brand in database
 */
export const deleteBrandValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
});
