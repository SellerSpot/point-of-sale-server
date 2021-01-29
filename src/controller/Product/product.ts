import lodash, { isNull } from 'lodash';
import { joiSchemaOptions } from 'utilities';
import { getProductModel } from 'utilities/modelService';
import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
import {
    createProductValidationSchema,
    deleteProductValidationSchema,
    getSingleProductValidationSchema,
    searchProductValidationSchema,
    updateProductValidationSchema,
} from './product.validation';

/**
 * Used to get all products from database
 */
export const getProducts = async (): Promise<pointOfSaleTypes.productResponseTypes.IGetProducts> => {
    try {
        const ProductModel = getProductModel(global.currentDb);
        return Promise.resolve({
            status: true,
            statusCode: STATUS_CODES.OK,
            data: await ProductModel.find(),
        });
    } catch (error) {
        return Promise.reject({
            status: false,
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            error: error.message,
        });
    }
};

/**
 * Used to get a single product from database
 */
export const getSingleProduct = async (
    productData: pointOfSaleTypes.productRequestTypes.IGetSingleProduct,
): Promise<pointOfSaleTypes.productResponseTypes.IGetProduct> => {
    try {
        // getting instance of database modal
        const ProductModel = getProductModel(global.currentDb);
        // validating input data
        const { error } = getSingleProductValidationSchema.validate(productData, joiSchemaOptions);
        if (!error) {
            const requestedData = await ProductModel.findById(productData.id);
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
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * Used to create a new product in database
 * @param productData Data to be added to database
 */
export const createProduct = async (
    productData: pointOfSaleTypes.productRequestTypes.ICreateProduct,
): Promise<pointOfSaleTypes.productResponseTypes.ICreateProduct> => {
    try {
        // validating input data
        const { error } = createProductValidationSchema.validate(productData, joiSchemaOptions);
        if (!error) {
            // getting instance of database modal
            const ProductModel = getProductModel(global.currentDb);
            const productToAdd: pointOfSaleTypes.productRequestTypes.ICreateProduct[] = await ProductModel.find(
                { name: productData.name },
            );

            if (productToAdd.length === 0) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.CREATED,
                    data: await ProductModel.create(productData),
                });
            } else {
                throw {
                    status: false,
                    statusCode: STATUS_CODES.CONFLICT,
                    error: [
                        {
                            name: 'name',
                            message: 'A product with this name already exists in database',
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
                            .label as pointOfSaleTypes.productResponseTypes.fieldNames,
                        message: fieldError.message,
                    };
                }),
            };
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * Used to update product data in database
 */
export const updateProduct = async (
    updateData: pointOfSaleTypes.productRequestTypes.IUpdateProduct,
): Promise<pointOfSaleTypes.productResponseTypes.IUpdateProduct> => {
    try {
        // getting instance of database modal
        const ProductModel = getProductModel(global.currentDb);
        // validating request data
        const { error } = updateProductValidationSchema.validate(updateData, joiSchemaOptions);
        if (!error) {
            // checking if a product with the given id exists in database
            const existingProduct = await ProductModel.findById(updateData.id);
            if (!lodash.isNull(existingProduct)) {
                // checking if a product with the same name already exists
                const existingProductName = await ProductModel.findOne({
                    name: updateData.productData.name,
                });
                if (lodash.isNull(existingProductName)) {
                    return Promise.resolve({
                        status: true,
                        statusCode: STATUS_CODES.OK,
                        data: await ProductModel.findByIdAndUpdate(
                            updateData.id,
                            updateData.productData,
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
                                message: 'This product name is already present in database',
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
                            message: 'No product exists for the given ID',
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
                            .label as pointOfSaleTypes.productResponseTypes.fieldNames,
                        message: fieldError.message,
                    };
                }),
            };
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * Used to delete a product from database
 */
export const deleteProduct = async (
    productData: pointOfSaleTypes.productRequestTypes.IDeleteProduct,
): Promise<pointOfSaleTypes.productResponseTypes.IDeleteProduct> => {
    try {
        // getting instance of database modal
        const ProductModel = getProductModel(global.currentDb);
        // validating the request data
        const { error } = deleteProductValidationSchema.validate(productData, joiSchemaOptions);
        if (!error) {
            // checking if the product to delete exists in database
            const existingProduct = await ProductModel.findById(productData.id);
            if (!lodash.isNull(existingProduct)) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.OK,
                    data: await ProductModel.findByIdAndDelete(productData.id),
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
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * Used to search for products with query string
 */
export const searchProducts = async (
    data: pointOfSaleTypes.productRequestTypes.ISearchProduct,
): Promise<pointOfSaleTypes.productResponseTypes.ISearchProduct> => {
    try {
        // getting instance of database modal
        const ProductModel = getProductModel(global.currentDb);
        // validating the request data
        const { error } = searchProductValidationSchema.validate(data, joiSchemaOptions);
        if (!error) {
            // searching for the query matching the barcode
            let existingProduct = await ProductModel.find({
                gtinNumber: data.query,
            });
            if (existingProduct.length > 0) {
                return Promise.resolve({
                    status: true,
                    statusCode: STATUS_CODES.OK,
                    data: {
                        queryType: 'barcode',
                        results: existingProduct,
                    },
                });
            } else {
                existingProduct = await ProductModel.find({
                    name: new RegExp('^' + data.query, 'gi'),
                });
                if (existingProduct.length > 0) {
                    return Promise.resolve({
                        status: true,
                        statusCode: STATUS_CODES.OK,
                        data: {
                            queryType: 'name',
                            results: existingProduct,
                        },
                    });
                } else {
                    throw {
                        status: false,
                        statusCode: STATUS_CODES.NO_CONTENT,
                        data: null,
                    };
                }
            }
        }
    } catch (error) {
        return Promise.reject(error);
    }
    return null;
};
