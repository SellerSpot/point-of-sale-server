import Joi from 'joi';
import { commonJoiSchemas } from 'utilities';

/**
 * Validation for getting a single stockUnit from database
 */
export const getSingleStockUnitValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
});

/**
 * Validation for creating a stockUnit in database
 */
export const createStockUnitValidationSchema = Joi.object({
    name: Joi.string().required(),
});

/**
 * Validation for updating a stockUnit in database
 */
export const updateStockUnitValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
    stockUnitData: createStockUnitValidationSchema.required(),
});

/**
 * Validation for deleting a stockUnit in database
 */
export const deleteStockUnitValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
});
