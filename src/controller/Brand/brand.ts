import { pointOfSaleTypes, STATUS_CODES } from '@sellerspot/universal-types';
import lodash from 'lodash';
import { joiSchemaOptions } from '../../utilities';
import { getBrandModel } from '../../utilities/modelService';
import { getSingleBrandValidationSchema } from './brand.validation';

/**
 * Used to get all brands from database
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

/**
 * Used to get a single brand based on brand id
 */
export const getSingleBrand = async (
    id: string,
): Promise<pointOfSaleTypes.brandResponseTypes.IGetBrand> => {
    try {
        // validating id parameter
        const { error } = getSingleBrandValidationSchema.validate(id, joiSchemaOptions);
        if (!error) {
            // getting instance of database modal
            const BrandModel = getBrandModel(global.currentDb);
            const requestedData = await BrandModel.findById(id);
            if (!lodash.isNull(requestedData)) {
                return {
                    status: true,
                    statusCode: STATUS_CODES.OK,
                    data: requestedData,
                };
            } else {
                return {
                    status: false,
                    statusCode: STATUS_CODES.NOT_FOUND,
                    error: 'Requested data not found in database',
                };
            }
        } else {
            return {
                status: false,
                statusCode: STATUS_CODES.BAD_REQUEST,
                error: 'Please verify request parameters',
            };
        }
    } catch (e) {
        return {
            status: false,
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            error: e.message,
        };
    }
};
