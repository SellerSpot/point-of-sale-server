import Joi from 'joi';
import { commonJoiSchemas } from 'utilities';

/**
 * Validation for getting a single taxBracket from database
 */
export const getSingleTaxBracketValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
});

/**
 * Validation for creating a taxBracket in database
 */
export const createTaxBracketValidationSchema = Joi.object({
    name: Joi.string().required(),
});

/**
 * Validation for updating a taxBracket in database
 */
export const updateTaxBracketValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
    taxBracketData: createTaxBracketValidationSchema.required(),
});

/**
 * Validation for deleting a taxBracket in database
 */
export const deleteTaxBracketValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
});
