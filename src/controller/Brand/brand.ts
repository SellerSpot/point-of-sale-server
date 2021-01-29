import lodash from 'lodash';
import { joiSchemaOptions } from 'utilities';
import { getBrandModel } from 'utilities/modelService';
import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
import {
    createBrandValidationSchema,
    deleteBrandValidationSchema,
    getSingleBrandValidationSchema,
    updateBrandValidationSchema,
} from './brand.validation';

/**
 * Used to get all brands from database
 */
export const getAllBrands = async (
    tenantId: string,
): Promise<pointOfSaleTypes.brandResponseTypes.IGetAllBrands> => {
    try {
        const tenantDb = global.currentDb.useDb(tenantId);
        const BrandModel = getBrandModel(tenantDb);
        return Promise.resolve({
            status: true,
            statusCode: STATUS_CODES.OK,
            data: await BrandModel.find(),
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
 * Used to get a single brand from database
 */
export const getSingleBrand = async (
    brandData: pointOfSaleTypes.brandRequestTypes.IGetSingleBrand,
    tenantId: string,
): Promise<pointOfSaleTypes.brandResponseTypes.IGetBrand> => {
    try {
        // validating input data
        const { error } = getSingleBrandValidationSchema.validate(brandData, joiSchemaOptions);
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const BrandModel = getBrandModel(tenantDb);
            const requestedData = await BrandModel.findById(brandData.id);
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
 * Used to create a new brand in database
 * @param brandData Data to be added to database
 */
export const createBrand = async (
    brandData: pointOfSaleTypes.brandRequestTypes.ICreateBrand,
    tenantId: string,
): Promise<pointOfSaleTypes.brandResponseTypes.ICreateBrand> => {
    try {
        // validating input data
        const { error } = createBrandValidationSchema.validate(brandData, joiSchemaOptions);
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const BrandModel = getBrandModel(tenantDb);
            const brandToAdd: pointOfSaleTypes.brandRequestTypes.ICreateBrand[] = await BrandModel.find(
                { name: brandData.name },
            );

            if (brandToAdd.length === 0) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.CREATED,
                    data: await BrandModel.create(brandData),
                });
            } else {
                throw {
                    status: false,
                    statusCode: STATUS_CODES.CONFLICT,
                    error: [
                        {
                            name: 'name',
                            message: 'A brand with this name already exists in database',
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
                            .label as pointOfSaleTypes.brandResponseTypes.fieldNames,
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
 * Used to update brand data in database
 */
export const updateBrand = async (
    updateData: pointOfSaleTypes.brandRequestTypes.IUpdateBrand,
    tenantId: string,
): Promise<pointOfSaleTypes.brandResponseTypes.IUpdateBrand> => {
    try {
        // validating request data
        const { error } = updateBrandValidationSchema.validate(updateData, joiSchemaOptions);
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const BrandModel = getBrandModel(tenantDb);
            // checking if a brand with the given id exists in database
            const existingBrand = await BrandModel.findById(updateData.id);
            if (!lodash.isNull(existingBrand)) {
                // checking if a brand with the same name already exists
                const existingBrandName = await BrandModel.findOne({
                    name: updateData.brandData.name,
                });
                if (lodash.isNull(existingBrandName)) {
                    return Promise.resolve({
                        status: true,
                        statusCode: STATUS_CODES.OK,
                        data: await BrandModel.findByIdAndUpdate(
                            updateData.id,
                            updateData.brandData,
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
                                message: 'This brand name is already present in database',
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
                            message: 'No brand exists for the given ID',
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
                            .label as pointOfSaleTypes.brandResponseTypes.fieldNames,
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
 * Used to delete a brand from database
 */
export const deleteBrand = async (
    brandData: pointOfSaleTypes.brandRequestTypes.IDeleteBrand,
    tenantId: string,
): Promise<pointOfSaleTypes.brandResponseTypes.IDeleteBrand> => {
    try {
        // validating the request data
        const { error } = deleteBrandValidationSchema.validate(brandData, joiSchemaOptions);
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const BrandModel = getBrandModel(tenantDb);
            // checking if the brand to delete exists in database
            const existingBrand = await BrandModel.findById(brandData.id);
            if (!lodash.isNull(existingBrand)) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.OK,
                    data: await BrandModel.findByIdAndDelete(brandData.id),
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
