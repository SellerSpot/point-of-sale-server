import { tenantDbModels } from '@sellerspot/database-models';
import Joi from 'joi';
import { commonJoiSchemas } from 'utilities';

/**
 * Validation for getting a single sale from database
 */
export const getSingleSaleValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
});

/**
 * Validation for creating a sale in database
 */
export const createSaleValidationSchema = Joi.object({
    status: Joi.string().valid(tenantDbModels.pointOfSaleModels.SaleModel.ESaleStatus).required(),
    products: Joi.array().items({
        _id: commonJoiSchemas.MONGODBID,
        product: Joi.string().required(),
        quantity: Joi.number().required(),
    }),
    subTotal: Joi.number(),
    discountPercent: Joi.number(),
    totalTax: Joi.number(),
    grandTotal: Joi.number(),
});

/**
 * Validation for updating a sale in database
 */
export const updateSaleValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
    saleData: createSaleValidationSchema.required(),
});

/**
 * Validation for deleting a sale in database
 */
export const deleteSaleValidationSchema = Joi.object({
    id: commonJoiSchemas.MONGODBID.required(),
});
