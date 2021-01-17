import { RequestHandler, Request, Response } from 'express';
import Joi from 'joi';
import lodash from 'lodash';
import { ProductModelTypes } from '../models';
import { addProductRequestBodySchema, IPostCreateProduct } from '../models/Product/Product.types';
import { commonJoiSchemas, joiSchemaOptions, responseStatusCodes } from '../utils';
import { getProductModel } from '../utils/modelService';

export const getProducts: RequestHandler = async (req: Request, res: Response) => {
    let response: ProductModelTypes.IResponse;
    try {
        const ProductModel = getProductModel();
        const productData = await ProductModel.find()
            .populate({ path: 'category' })
            .populate({ path: 'brand' })
            .populate({
                path: 'stockInformation.stockUnit',
            })
            .populate({ path: 'taxBracket' });
        const compiledData: ProductModelTypes.IGetProduct[] = [];
        productData.map((product) => {
            compiledData.push({
                _id: product.id,
                brand: product.brand,
                category: product.category,
                gtinNumber: product.gtinNumber,
                landingPrice: product.landingPrice,
                mrpPrice: product.mrpPrice,
                name: product.name,
                profitPercent: product.profitPercent,
                sellingPrice: product.sellingPrice,
                stockInformation: product.stockInformation,
                taxBracket: product.taxBracket,
            });
        });

        response = {
            status: true,
            statusCode: responseStatusCodes.OK,
            data: compiledData,
        };
    } catch (e) {
        response = {
            status: false,
            statusCode: responseStatusCodes.INTERNALSERVERERROR,
            data: e.message,
        };
    } finally {
        res.send(response);
    }
};

export const getSingleProduct: RequestHandler = async (req: Request, res: Response) => {
    let response: ProductModelTypes.IResponse;
    try {
        const requestParamsSchema = Joi.object({
            productid: commonJoiSchemas.MONGODBID.required(),
        });
        const { error, value } = requestParamsSchema.validate(req.params, joiSchemaOptions);
        req.params = value;
        if (error) {
            response = {
                status: false,
                statusCode: responseStatusCodes.BADREQUEST,
                data: error.message,
            };
        } else {
            const ProductModel = getProductModel();
            const { productid } = req.params;
            // checking if Product already exists
            const productData = await ProductModel.findById(productid)
                .populate({ path: 'category' })
                .populate({ path: 'brand' })
                .populate({
                    path: 'stockInformation.stockUnit',
                })
                .populate({ path: 'taxBracket' });
            if (!lodash.isNull(productData)) {
                response = {
                    status: true,
                    statusCode: responseStatusCodes.OK,
                    data: {
                        _id: productData.id,
                        brand: productData.brand,
                        category: productData.category,
                        gtinNumber: productData.gtinNumber,
                        landingPrice: productData.landingPrice,
                        mrpPrice: productData.mrpPrice,
                        name: productData.name,
                        profitPercent: productData.profitPercent,
                        sellingPrice: productData.sellingPrice,
                        stockInformation: productData.stockInformation,
                        taxBracket: productData.taxBracket,
                    },
                };
            } else {
                response = {
                    status: false,
                    statusCode: responseStatusCodes.NOTFOUND,
                    data: 'Product does not exist in database',
                };
            }
        }
    } catch (e) {
        response = {
            status: false,
            statusCode: responseStatusCodes.INTERNALSERVERERROR,
            data: e.message,
        };
    } finally {
        res.send(response);
    }
};

/**
 * Used to create a single product on server
 */
export const createProduct: RequestHandler = async (req: Request, res: Response) => {
    let response: ProductModelTypes.IResponse;
    try {
        const { error, value } = addProductRequestBodySchema.validate(req.body, joiSchemaOptions);
        req.body = <IPostCreateProduct>value;
        if (error) {
            response = {
                status: false,
                statusCode: responseStatusCodes.BADREQUEST,
                error: error.details.map((fieldError) => {
                    return {
                        fieldName: fieldError.context.label,
                        message: fieldError.message,
                    };
                }),
            };
        } else {
            const ProductModel = getProductModel();
            await ProductModel.create({
                name: req.body.name,
                brand: req.body.brand,
                category: req.body.category,
                sellingPrice: req.body.sellingPrice,
                stockInformation: req.body.stockInformation,
                gtinNumber: req.body.gtinNumber,
                landingPrice: req.body.landingPrice,
                mrpPrice: req.body.mrpPrice,
                profitPercent: req.body.profitPercent,
                taxBracket: req.body.taxBracket,
            });
            response = {
                status: true,
                statusCode: responseStatusCodes.CREATED,
                data: 'Product added successfully',
            };
        }
    } catch (e) {
        response = {
            status: false,
            statusCode: responseStatusCodes.INTERNALSERVERERROR,
            error: [
                {
                    fieldName: 'commonMessage',
                    message: e.message,
                },
            ],
        };
    } finally {
        res.send(response);
    }
};

export const deleteProduct: RequestHandler = async (req: Request, res: Response) => {
    let response: ProductModelTypes.IResponse;
    try {
        const requestParamsSchema = Joi.object({
            productid: commonJoiSchemas.MONGODBID.required(),
        });
        const { error, value } = requestParamsSchema.validate(req.params, joiSchemaOptions);
        req.params = value;
        if (error) {
            response = {
                status: false,
                statusCode: responseStatusCodes.BADREQUEST,
                data: error.message,
            };
        } else {
            const ProductModel = getProductModel();
            const { productid } = req.params;
            // checking if Product already exists
            if ((await ProductModel.findById(productid)) !== null) {
                await ProductModel.findByIdAndDelete(productid);
                response = {
                    status: true,
                    statusCode: responseStatusCodes.NOCONTENT,
                };
            } else {
                response = {
                    status: false,
                    statusCode: responseStatusCodes.NOTFOUND,
                    data: 'Product does not exist in database',
                };
            }
        }
    } catch (e) {
        response = {
            status: false,
            statusCode: responseStatusCodes.INTERNALSERVERERROR,
            data: e.message,
        };
    } finally {
        res.send(response);
    }
};
