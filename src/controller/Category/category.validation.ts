import Joi from 'joi';
import { commonJoiSchemas } from 'utilities';

/**
 * Validation for getting a single category from database
 */
export const getSingleCategoryValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
});

/**
 * Validation for creating a category in database
 */
export const createCategoryValidationSchema = Joi.object({
    name: Joi.string().required(),
});

/**
 * Validation for updating a category in database
 */
export const updateCategoryValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
    categoryData: createCategoryValidationSchema.required(),
});

/**
 * Validation for deleting a category in database
 */
export const deleteCategoryValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
});
