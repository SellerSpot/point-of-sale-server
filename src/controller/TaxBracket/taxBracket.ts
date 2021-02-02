import lodash from 'lodash';
import { joiSchemaOptions } from 'utilities';
import { getTaxBracketModel } from 'utilities/modelService';
import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
import {
    createTaxBracketValidationSchema,
    deleteTaxBracketValidationSchema,
    getSingleTaxBracketValidationSchema,
    updateTaxBracketValidationSchema,
} from './taxBracket.validation';

/**
 * Used to get all taxBrackets from database
 */
export const getTaxBrackets = async (
    tenantId: string,
): Promise<pointOfSaleTypes.taxBracketResponseTypes.IGetAllTaxBrackets> => {
    try {
        const tenantDb = global.currentDb.useDb(tenantId);
        const TaxBracketModel = getTaxBracketModel(tenantDb);
        return Promise.resolve({
            status: true,
            statusCode: STATUS_CODES.OK,
            data: await TaxBracketModel.find(),
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
 * Used to get a single taxBracket from database
 */
export const getSingleTaxBracket = async (
    taxBracketData: pointOfSaleTypes.taxBracketRequestTypes.IGetSingleTaxBracket,
    tenantId: string,
): Promise<pointOfSaleTypes.taxBracketResponseTypes.IGetTaxBracket> => {
    try {
        // validating input data
        const { error } = getSingleTaxBracketValidationSchema.validate(
            taxBracketData,
            joiSchemaOptions,
        );
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const TaxBracketModel = getTaxBracketModel(tenantDb);
            const requestedData = await TaxBracketModel.findById(taxBracketData.id);
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
 * Used to create a new taxBracket in database
 * @param taxBracketData Data to be added to database
 */
export const createTaxBracket = async (
    taxBracketData: pointOfSaleTypes.taxBracketRequestTypes.ICreateTaxBracket,
    tenantId: string,
): Promise<pointOfSaleTypes.taxBracketResponseTypes.ICreateTaxBracket> => {
    try {
        // validating input data
        const { error } = createTaxBracketValidationSchema.validate(
            taxBracketData,
            joiSchemaOptions,
        );
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const TaxBracketModel = getTaxBracketModel(tenantDb);
            const taxBracketToAdd: pointOfSaleTypes.taxBracketRequestTypes.ICreateTaxBracket[] = await TaxBracketModel.find(
                { name: taxBracketData.name },
            );

            if (taxBracketToAdd.length === 0) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.CREATED,
                    data: await TaxBracketModel.create(taxBracketData),
                });
            } else {
                throw {
                    status: false,
                    statusCode: STATUS_CODES.CONFLICT,
                    error: [
                        {
                            name: 'name',
                            message: 'A taxBracket with this name already exists in database',
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
                            .label as pointOfSaleTypes.taxBracketResponseTypes.fieldNames,
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
 * Used to update taxBracket data in database
 */
export const updateTaxBracket = async (
    updateData: pointOfSaleTypes.taxBracketRequestTypes.IUpdateTaxBracket,
    tenantId: string,
): Promise<pointOfSaleTypes.taxBracketResponseTypes.IUpdateTaxBracket> => {
    try {
        // validating request data
        const { error } = updateTaxBracketValidationSchema.validate(updateData, joiSchemaOptions);
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const TaxBracketModel = getTaxBracketModel(tenantDb);
            // checking if a taxBracket with the given id exists in database
            const existingTaxBracket = await TaxBracketModel.findById(updateData.id);
            if (!lodash.isNull(existingTaxBracket)) {
                // checking if a taxBracket with the same name already exists
                const existingTaxBracketName = await TaxBracketModel.findOne({
                    name: updateData.taxBracketData.name,
                });
                if (lodash.isNull(existingTaxBracketName)) {
                    return Promise.resolve({
                        status: true,
                        statusCode: STATUS_CODES.OK,
                        data: await TaxBracketModel.findByIdAndUpdate(
                            updateData.id,
                            updateData.taxBracketData,
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
                                message: 'This taxBracket name is already present in database',
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
                            message: 'No taxBracket exists for the given ID',
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
                            .label as pointOfSaleTypes.taxBracketResponseTypes.fieldNames,
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
 * Used to delete a taxBracket from database
 */
export const deleteTaxBracket = async (
    taxBracketData: pointOfSaleTypes.taxBracketRequestTypes.IDeleteTaxBracket,
    tenantId: string,
): Promise<pointOfSaleTypes.taxBracketResponseTypes.IDeleteTaxBracket> => {
    try {
        // validating the request data
        const { error } = deleteTaxBracketValidationSchema.validate(
            taxBracketData,
            joiSchemaOptions,
        );
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const TaxBracketModel = getTaxBracketModel(tenantDb);
            // checking if the taxBracket to delete exists in database
            const existingTaxBracket = await TaxBracketModel.findById(taxBracketData.id);
            if (!lodash.isNull(existingTaxBracket)) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.OK,
                    data: await TaxBracketModel.findByIdAndDelete(taxBracketData.id),
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
