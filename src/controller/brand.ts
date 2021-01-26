import { RequestHandler, Request, Response } from 'express';
import Joi from 'joi';
import { commonJoiSchemas, joiSchemaOptions } from '../utilities';
import { getBrandModel } from '../utilities/modelService';
import { tenantDbModels } from '@sellerspot/database-models';
import { pointOfSaleTypes, STATUS_CODES } from '@sellerspot/universal-types';

/**
 * Used to get all brands
 */
export const getBrands = async (): Promise<pointOfSaleTypes.brandResponseTypes.IGetBrand> => {
    try {
        const BrandModel = getBrandModel(global.currentDb);
        return {
            status: true,
            statusCode: STATUS_CODES.OK,
            data: await BrandModel.find(),
        };
    } catch (e) {
        return {
            status: false,
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            error: e.message,
        };
    }
};
