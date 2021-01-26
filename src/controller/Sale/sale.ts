import { pointOfSaleTypes, STATUS_CODES } from '@sellerspot/universal-types';
import lodash from 'lodash';
import { joiSchemaOptions } from 'utilities';
import { getSaleModel } from 'utilities/modelService';
import {
    createSaleValidationSchema,
    deleteSaleValidationSchema,
    getSingleSaleValidationSchema,
    updateSaleValidationSchema,
} from './sale.validation';

/**
 * Used to get all sales from database
 */
export const getSales = async (): Promise<pointOfSaleTypes.saleResponseTypes.IGetSales> => {
    try {
        const SaleModel = getSaleModel(global.currentDb);
        return Promise.resolve({
            status: true,
            statusCode: STATUS_CODES.OK,
            data: await SaleModel.find(),
        });
    } catch (err) {
        return Promise.reject({
            status: false,
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            error: err.message,
        });
    }
};

/**
 * Used to get a single sale from database
 */
export const getSingleSale = async (
    saleData: pointOfSaleTypes.saleRequestTypes.IGetSingleSale,
): Promise<pointOfSaleTypes.saleResponseTypes.IGetSale> => {
    try {
        // getting instance of database modal
        const SaleModel = getSaleModel(global.currentDb);
        // validating input data
        const { error } = getSingleSaleValidationSchema.validate(saleData, joiSchemaOptions);
        if (!error) {
            const requestedData = await SaleModel.findById(saleData.id);
            if (!lodash.isNull(requestedData)) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.OK,
                    data: requestedData,
                });
            } else {
                throw {
                    status: false,
                    statusCode: STATUS_CODES.NO_CONTENT,
                    error: 'Requested data not found in database',
                };
            }
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.BAD_REQUEST,
                error: 'Please verify request parameters',
            };
        }
    } catch (err) {
        return Promise.reject(err);
    }
};

/**
 * Used to create a new sale in database
 * @param saleData Data to be added to database
 */
export const createSale = async (
    saleData: pointOfSaleTypes.saleRequestTypes.ICreateSale,
): Promise<pointOfSaleTypes.saleResponseTypes.ICreateSale> => {
    try {
        // validating input data
        const { error } = createSaleValidationSchema.validate(saleData, joiSchemaOptions);
        if (!error) {
            // getting instance of database modal
            const SaleModel = getSaleModel(global.currentDb);
            return Promise.resolve({
                status: true,
                statusCode: STATUS_CODES.CREATED,
                data: await SaleModel.create(saleData),
            });
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.BAD_REQUEST,
                error: error.details.map((fieldError) => {
                    return {
                        name: fieldError.context
                            .label as pointOfSaleTypes.saleResponseTypes.fieldNames,
                        message: fieldError.message,
                    };
                }),
            };
        }
    } catch (err) {
        return Promise.reject(err);
    }
};

/**
 * Used to update sale data in database
 */
export const updateSale = async (
    updateData: pointOfSaleTypes.saleRequestTypes.IUpdateSale,
): Promise<pointOfSaleTypes.saleResponseTypes.IUpdateSale> => {
    try {
        // getting instance of database modal
        const SaleModel = getSaleModel(global.currentDb);
        // validating request data
        const { error } = updateSaleValidationSchema.validate(updateData, joiSchemaOptions);
        if (!error) {
            // checking if a sale with the given id exists in database
            const existingSale = await SaleModel.findById(updateData.id);
            if (!lodash.isNull(existingSale)) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.OK,
                    data: await SaleModel.findByIdAndUpdate(updateData.id, updateData.saleData, {
                        new: true,
                    }),
                });
            } else {
                throw {
                    status: false,
                    statusCode: STATUS_CODES.NO_CONTENT,
                    error: [
                        {
                            name: 'id',
                            message: 'No sale exists for the given ID',
                        },
                    ],
                };
            }
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.BAD_REQUEST,
                error: error.details.map((fieldError) => {
                    return {
                        name: fieldError.context
                            .label as pointOfSaleTypes.saleResponseTypes.fieldNames,
                        message: fieldError.message,
                    };
                }),
            };
        }
    } catch (err) {
        return Promise.reject(err);
    }
};

/**
 * Used to delete a sale from database
 */
export const deleteSale = async (
    saleData: pointOfSaleTypes.saleRequestTypes.IDeleteSale,
): Promise<pointOfSaleTypes.saleResponseTypes.IDeleteSale> => {
    try {
        // getting instance of database modal
        const SaleModel = getSaleModel(global.currentDb);
        // validating the request data
        const { error } = deleteSaleValidationSchema.validate(saleData, joiSchemaOptions);
        if (!error) {
            // checking if the sale to delete exists in database
            const existingSale = await SaleModel.findById(saleData.id);
            if (!lodash.isNull(existingSale)) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.OK,
                    data: await SaleModel.findByIdAndDelete(saleData.id),
                });
            } else {
                throw {
                    status: false,
                    statusCode: STATUS_CODES.NO_CONTENT,
                    error: 'Requested data not found in database',
                };
            }
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.BAD_REQUEST,
                error: 'Please verify request parameters',
            };
        }
    } catch (err) {
        return Promise.reject(err);
    }
};
