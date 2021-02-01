import lodash from 'lodash';
import { joiSchemaOptions } from 'utilities';
import { getSaleModel } from 'utilities/modelService';
import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
import {
    createSaleValidationSchema,
    deleteSaleValidationSchema,
    getSingleSaleValidationSchema,
    updateSaleValidationSchema,
} from './sale.validation';

/**
 * Used to get all sales from database
 */
export const getSales = async (
    tenantId: string,
): Promise<pointOfSaleTypes.saleResponseTypes.IGetSales> => {
    try {
        const tenantDb = global.currentDb.useDb(tenantId);
        const SaleModel = getSaleModel(tenantDb);
        const data = <pointOfSaleTypes.saleResponseTypes.IGetSales['data']>await SaleModel.find();
        return Promise.resolve({
            status: true,
            statusCode: STATUS_CODES.OK,
            data,
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
    tenantId: string,
): Promise<pointOfSaleTypes.saleResponseTypes.IGetSale> => {
    try {
        // validating input data
        const { error } = getSingleSaleValidationSchema.validate(saleData, joiSchemaOptions);
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const SaleModel = getSaleModel(tenantDb);
            const requestedData = <pointOfSaleTypes.saleResponseTypes.IGetSale['data']>(
                await SaleModel.findById(saleData.id)
            );
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
    tenantId: string,
): Promise<pointOfSaleTypes.saleResponseTypes.ICreateSale> => {
    try {
        const { error } = createSaleValidationSchema.validate(saleData, joiSchemaOptions);
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const SaleModel = getSaleModel(tenantDb);
            const data = <pointOfSaleTypes.saleResponseTypes.ICreateSale['data']>(
                await SaleModel.create(saleData)
            );
            return Promise.resolve({
                status: true,
                statusCode: STATUS_CODES.CREATED,
                data,
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
    tenantId: string,
): Promise<pointOfSaleTypes.saleResponseTypes.IUpdateSale> => {
    try {
        // validating request data
        const { error } = updateSaleValidationSchema.validate(updateData, joiSchemaOptions);
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const SaleModel = getSaleModel(tenantDb);
            // checking if a sale with the given id exists in database
            const existingSale = await SaleModel.findById(updateData.id);
            if (!lodash.isNull(existingSale)) {
                const data = <pointOfSaleTypes.saleResponseTypes.IUpdateSale['data']>(
                    await SaleModel.findByIdAndUpdate(updateData.id, updateData.saleData, {
                        new: true,
                    })
                );
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.OK,
                    data,
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
    tenantId: string,
): Promise<pointOfSaleTypes.saleResponseTypes.IDeleteSale> => {
    try {
        // validating the request data
        const { error } = deleteSaleValidationSchema.validate(saleData, joiSchemaOptions);
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const SaleModel = getSaleModel(tenantDb);

            // checking if the sale to delete exists in database
            const existingSale = await SaleModel.findById(saleData.id);
            const data = <pointOfSaleTypes.saleResponseTypes.IDeleteSale['data']>(
                await SaleModel.findByIdAndDelete(saleData.id)
            );
            if (!lodash.isNull(existingSale)) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.OK,
                    data,
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
