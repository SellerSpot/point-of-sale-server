import { pointOfSaleTypes, STATUS_CODES } from '@sellerspot/universal-types';
import lodash from 'lodash';
import { joiSchemaOptions } from 'utilities';
import { getStockUnitModel } from 'utilities/modelService';
import {
    createStockUnitValidationSchema,
    deleteStockUnitValidationSchema,
    getSingleStockUnitValidationSchema,
    updateStockUnitValidationSchema,
} from './stockUnit.validation';

/**
 * Used to get all stockUnits from database
 */
export const getStockUnits = async (): Promise<pointOfSaleTypes.stockUnitResponseTypes.IGetStockUnits> => {
    try {
        const StockUnitModel = getStockUnitModel(global.currentDb);
        return Promise.resolve({
            status: true,
            statusCode: STATUS_CODES.OK,
            data: await StockUnitModel.find(),
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
 * Used to get a single stockUnit from database
 */
export const getSingleStockUnit = async (
    stockUnitData: pointOfSaleTypes.stockUnitRequestTypes.IGetSingleStockUnit,
): Promise<pointOfSaleTypes.stockUnitResponseTypes.IGetStockUnit> => {
    try {
        // getting instance of database modal
        const StockUnitModel = getStockUnitModel(global.currentDb);
        // validating input data
        const { error } = getSingleStockUnitValidationSchema.validate(
            stockUnitData,
            joiSchemaOptions,
        );
        if (!error) {
            const requestedData = await StockUnitModel.findById(stockUnitData.id);
            if (!lodash.isNull(requestedData)) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.OK,
                    data: await StockUnitModel.findById(stockUnitData.id),
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
 * Used to create a new stockUnit in database
 * @param stockUnitData Data to be added to database
 */
export const createStockUnit = async (
    stockUnitData: pointOfSaleTypes.stockUnitRequestTypes.ICreateStockUnit,
): Promise<pointOfSaleTypes.stockUnitResponseTypes.ICreateStockUnit> => {
    try {
        // validating input data
        const { error } = createStockUnitValidationSchema.validate(stockUnitData, joiSchemaOptions);
        if (!error) {
            // getting instance of database modal
            const StockUnitModel = getStockUnitModel(global.currentDb);
            const stockUnitToAdd: pointOfSaleTypes.stockUnitRequestTypes.ICreateStockUnit[] = await StockUnitModel.find(
                { name: stockUnitData.name },
            );

            if (stockUnitToAdd.length === 0) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.CREATED,
                    data: await StockUnitModel.create(stockUnitData),
                });
            } else {
                throw {
                    status: false,
                    statusCode: STATUS_CODES.CONFLICT,
                    error: [
                        {
                            name: 'name',
                            message: 'A stock unit with this name already exists in database',
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
                            .label as pointOfSaleTypes.stockUnitResponseTypes.fieldNames,
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
 * Used to update stockUnit data in database
 */
export const updateStockUnit = async (
    updateData: pointOfSaleTypes.stockUnitRequestTypes.IUpdateStockUnit,
): Promise<pointOfSaleTypes.stockUnitResponseTypes.IUpdateStockUnit> => {
    try {
        // getting instance of database modal
        const StockUnitModel = getStockUnitModel(global.currentDb);
        // validating request data
        const { error } = updateStockUnitValidationSchema.validate(updateData, joiSchemaOptions);
        if (!error) {
            // checking if a stockUnit with the given id exists in database
            const existingStockUnit = await StockUnitModel.findById(updateData.id);
            if (!lodash.isNull(existingStockUnit)) {
                // checking if a stockUnit with the same name already exists
                const existingStockUnitName = await StockUnitModel.findOne({
                    name: updateData.stockUnitData.name,
                });
                if (lodash.isNull(existingStockUnitName)) {
                    return Promise.resolve({
                        status: true,
                        statusCode: STATUS_CODES.OK,
                        data: await StockUnitModel.findByIdAndUpdate(
                            updateData.id,
                            updateData.stockUnitData,
                            {
                                new: true,
                            },
                        ),
                    });
                } else {
                    throw {
                        status: false,
                        statusCode: STATUS_CODES.CONFLICT,
                        error: [
                            {
                                name: 'name',
                                message: 'This stock unit name is already present in database',
                            },
                        ],
                    };
                }
            } else {
                throw {
                    status: false,
                    statusCode: STATUS_CODES.NO_CONTENT,
                    error: [
                        {
                            name: 'id',
                            message: 'No stock units exists for the given ID',
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
                            .label as pointOfSaleTypes.stockUnitResponseTypes.fieldNames,
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
 * Used to delete a stockUnit from database
 */
export const deleteStockUnit = async (
    stockUnitData: pointOfSaleTypes.stockUnitRequestTypes.IDeleteStockUnit,
): Promise<pointOfSaleTypes.stockUnitResponseTypes.IDeleteStockUnit> => {
    try {
        // getting instance of database modal
        const StockUnitModel = getStockUnitModel(global.currentDb);
        // validating the request data
        const { error } = deleteStockUnitValidationSchema.validate(stockUnitData, joiSchemaOptions);
        if (!error) {
            // checking if the stockUnit to delete exists in database
            const existingStockUnit = await StockUnitModel.findById(stockUnitData.id);
            if (!lodash.isNull(existingStockUnit)) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.OK,
                    data: await StockUnitModel.findByIdAndDelete(stockUnitData.id),
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
