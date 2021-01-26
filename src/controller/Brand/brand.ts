import { pointOfSaleTypes, STATUS_CODES } from '@sellerspot/universal-types';
import lodash from 'lodash';
import { joiSchemaOptions } from 'utilities';
import { getBrandModel } from 'utilities/modelService';
import {
    createBrandValidationSchema,
    deleteBrandValidationSchema,
    getSingleBrandValidationSchema,
    updateBrandValidationSchema,
} from './brand.validation';

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
 * Used to get a single brand from database
 */
export const getSingleBrand = async (
    brandData: pointOfSaleTypes.brandRequestTypes.IGetSingleBrand,
): Promise<pointOfSaleTypes.brandResponseTypes.IGetBrand> => {
    try {
        // getting instance of database modal
        const BrandModel = getBrandModel(global.currentDb);
        // validating input data
        const { error } = getSingleBrandValidationSchema.validate(brandData, joiSchemaOptions);
        if (!error) {
            const requestedData = await BrandModel.findById(brandData.id);
            if (!lodash.isNull(requestedData)) {
                return {
                    status: true,
                    statusCode: STATUS_CODES.OK,
                    data: requestedData,
                };
            } else {
                return {
                    status: false,
                    statusCode: STATUS_CODES.NO_CONTENT,
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

/**
 * Used to create a new brand in database
 * @param brandData Data to be added to database
 */
export const createBrand = async (
    brandData: pointOfSaleTypes.brandRequestTypes.ICreateBrand,
): Promise<pointOfSaleTypes.brandResponseTypes.ICreateBrand> => {
    try {
        // validating input data
        const { error } = createBrandValidationSchema.validate(brandData, joiSchemaOptions);
        if (!error) {
            // getting instance of database modal
            const BrandModel = getBrandModel(global.currentDb);
            const brandToAdd: pointOfSaleTypes.brandRequestTypes.ICreateBrand[] = await BrandModel.find(
                { name: brandData.name },
            );

            if (brandToAdd.length === 0) {
                return {
                    status: true,
                    statusCode: STATUS_CODES.CREATED,
                    data: await BrandModel.create(brandData),
                };
            } else {
                return {
                    status: false,
                    statusCode: STATUS_CODES.CONFLICT,
                    error: [
                        {
                            name: 'name',
                            message: 'A category with this name already exists in database',
                        },
                    ],
                };
            }
        } else {
            return {
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
    } catch (e) {
        return {
            status: false,
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            error: e.message,
        };
    }
};

/**
 * Used to update brand data in database
 */
export const updateBrand = async (
    updateData: pointOfSaleTypes.brandRequestTypes.IUpdateBrand,
): Promise<pointOfSaleTypes.brandResponseTypes.IUpdateBrand> => {
    try {
        // getting instance of database modal
        const BrandModel = getBrandModel(global.currentDb);
        // validating request data
        const { error } = updateBrandValidationSchema.validate(updateData, joiSchemaOptions);
        if (!error) {
            // checking if a brand with the given id exists in database
            const existingBrand = await BrandModel.findById(updateData.id);
            if (!lodash.isNull(existingBrand)) {
                // checking if a brand with the same name already exists
                const existingBrandName = await BrandModel.findOne({
                    name: updateData.brandData.name,
                });
                if (lodash.isNull(existingBrandName)) {
                    return {
                        status: true,
                        statusCode: STATUS_CODES.OK,
                        data: await BrandModel.findByIdAndUpdate(
                            updateData.id,
                            updateData.brandData,
                            {
                                new: true,
                            },
                        ),
                    };
                } else {
                    return {
                        status: false,
                        statusCode: STATUS_CODES.CONFLICT,
                        error: [
                            {
                                name: 'name',
                                message: 'This category name is already present in database',
                            },
                        ],
                    };
                }
            } else {
                return {
                    status: false,
                    statusCode: STATUS_CODES.NO_CONTENT,
                    error: [
                        {
                            name: 'id',
                            message: 'No category exists for the given ID',
                        },
                    ],
                };
            }
        } else {
            return {
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
    } catch (e) {
        return {
            status: false,
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            error: e.message,
        };
    }
};

/**
 * Used to delete a brand from database
 */
export const deleteBrand = async (
    brandData: pointOfSaleTypes.brandRequestTypes.IDeleteBrand,
): Promise<pointOfSaleTypes.brandResponseTypes.IDeleteBrand> => {
    try {
        // getting instance of database modal
        const BrandModel = getBrandModel(global.currentDb);
        // validating the request data
        const { error } = deleteBrandValidationSchema.validate(brandData, joiSchemaOptions);
        if (!error) {
            // checking if the brand to delete exists in database
            const existingBrand = await BrandModel.findById(brandData.id);
            if (!lodash.isNull(existingBrand)) {
                return {
                    status: true,
                    statusCode: STATUS_CODES.OK,
                    data: await BrandModel.findByIdAndDelete(brandData.id),
                };
            } else {
                return {
                    status: false,
                    statusCode: STATUS_CODES.NO_CONTENT,
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
