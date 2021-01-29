import lodash from 'lodash';
import { joiSchemaOptions } from 'utilities';
import { getCategoryModel } from 'utilities/modelService';
import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
import {
    createCategoryValidationSchema,
    deleteCategoryValidationSchema,
    getSingleCategoryValidationSchema,
    updateCategoryValidationSchema,
} from './category.validation';

/**
 * Used to get all categorys from database
 */
export const getCategories = async (
    tenantId: string,
): Promise<pointOfSaleTypes.categoryResponseTypes.IGetAllCategories> => {
    try {
        const tenantDb = global.currentDb.useDb(tenantId);
        const CategoryModel = getCategoryModel(tenantDb);
        return Promise.resolve({
            status: true,
            statusCode: STATUS_CODES.OK,
            data: await CategoryModel.find(),
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
 * Used to get a single category from database
 */
export const getSingleCategory = async (
    categoryData: pointOfSaleTypes.categoryRequestTypes.IGetSingleCategory,
    tenantId: string,
): Promise<pointOfSaleTypes.categoryResponseTypes.IGetCategory> => {
    try {
        // validating input data
        const { error } = getSingleCategoryValidationSchema.validate(
            categoryData,
            joiSchemaOptions,
        );
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const CategoryModel = getCategoryModel(tenantDb);
            const requestedData = await CategoryModel.findById(categoryData.id);
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
 * Used to create a new category in database
 * @param categoryData Data to be added to database
 */
export const createCategory = async (
    categoryData: pointOfSaleTypes.categoryRequestTypes.ICreateCategory,
    tenantId: string,
): Promise<pointOfSaleTypes.categoryResponseTypes.ICreateCategory> => {
    try {
        // validating input data
        const { error } = createCategoryValidationSchema.validate(categoryData, joiSchemaOptions);
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const CategoryModel = getCategoryModel(tenantDb);
            const categoryToAdd: pointOfSaleTypes.categoryRequestTypes.ICreateCategory[] = await CategoryModel.find(
                { name: categoryData.name },
            );

            if (categoryToAdd.length === 0) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.CREATED,
                    data: await CategoryModel.create(categoryData),
                });
            } else {
                throw {
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
            throw {
                status: false,
                statusCode: STATUS_CODES.BAD_REQUEST,
                error: error.details.map((fieldError) => {
                    return {
                        name: fieldError.context
                            .label as pointOfSaleTypes.categoryResponseTypes.fieldNames,
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
 * Used to update category data in database
 */
export const updateCategory = async (
    updateData: pointOfSaleTypes.categoryRequestTypes.IUpdateCategory,
    tenantId: string,
): Promise<pointOfSaleTypes.categoryResponseTypes.IUpdateCategory> => {
    try {
        // validating request data
        const { error } = updateCategoryValidationSchema.validate(updateData, joiSchemaOptions);
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const CategoryModel = getCategoryModel(tenantDb);
            // checking if a category with the given id exists in database
            const existingCategory = await CategoryModel.findById(updateData.id);
            if (!lodash.isNull(existingCategory)) {
                // checking if a category with the same name already exists
                const existingCategoryName = await CategoryModel.findOne({
                    name: updateData.categoryData.name,
                });
                if (lodash.isNull(existingCategoryName)) {
                    return Promise.resolve({
                        status: true,
                        statusCode: STATUS_CODES.OK,
                        data: await CategoryModel.findByIdAndUpdate(
                            updateData.id,
                            updateData.categoryData,
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
                                message: 'This category name is already present in database',
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
                            message: 'No category exists for the given ID',
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
                            .label as pointOfSaleTypes.categoryResponseTypes.fieldNames,
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
 * Used to delete a category from database
 */
export const deleteCategory = async (
    categoryData: pointOfSaleTypes.categoryRequestTypes.IDeleteCategory,
    tenantId: string,
): Promise<pointOfSaleTypes.categoryResponseTypes.IDeleteCategory> => {
    try {
        // validating the request data
        const { error } = deleteCategoryValidationSchema.validate(categoryData, joiSchemaOptions);
        if (!error) {
            const tenantDb = global.currentDb.useDb(tenantId);
            const CategoryModel = getCategoryModel(tenantDb);
            // checking if the category to delete exists in database
            const existingCategory = await CategoryModel.findById(categoryData.id);
            if (!lodash.isNull(existingCategory)) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.OK,
                    data: await CategoryModel.findByIdAndDelete(categoryData.id),
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
