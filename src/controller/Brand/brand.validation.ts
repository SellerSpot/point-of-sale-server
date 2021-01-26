import Joi from 'joi';
import { commonJoiSchemas } from 'utilities';

/**
 * Validation for getting a single brand from database
 */
export const getSingleBrandValidationSchema = commonJoiSchemas.MONGODBID;
