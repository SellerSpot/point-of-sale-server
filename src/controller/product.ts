import { RequestHandler, Request, Response } from 'express';
import Joi from 'joi';
import { IResponse } from '../typings/request.types';
import { commonJoiSchemas, inputFieldNames, joiSchemaOptions, responseStatusCodes } from '../utils';
import { getProductModel } from '../utils/modelService';

export const getProducts: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const ProductModel = getProductModel();
        response = {
            status: true,
            statusCode: responseStatusCodes.OK,
            data: await ProductModel.find(),
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
    let response: IResponse;
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
                response = {
                    status: true,
                    statusCode: responseStatusCodes.OK,
                    data: await ProductModel.findById(productid),
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

export const createProduct: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const requestBodySchema = Joi.object({
            name: Joi.string().required().messages({
                'string.base': 'Name must be a string',
                'any.required': 'Name is required',
            }),
            category: commonJoiSchemas.MONGODBID.required().messages({
                'string.base': 'Category must be a string',
                'any.required': 'Category is required',
            }),
            brand: commonJoiSchemas.MONGODBID.required().messages({
                'string.base': 'Brand must be a string',
                'any.required': 'Brand is required',
            }),
            gtinNumber: Joi.string().messages({
                'string.base': 'GTIN number must be a string',
            }),
            mrpPrice: Joi.number().min(0).messages({
                'number.base': 'MRP must be a number',
                'number.min': 'MRP should be greater than zero',
            }),
            landingPrice: Joi.number().min(0).messages({
                'number.base': 'Landing Price must be a number',
                'number.min': 'Landing Price should be greater than zero',
            }),
            sellingPrice: Joi.number().min(0).messages({
                'number.base': 'Selling Price must be a number',
                'number.min': 'Selling Price should be greater than zero',
            }),
            stockInformation: Joi.object({
                availableStock: Joi.number().min(0).required().messages({
                    'number.base': 'Available Stock must be a number',
                    'number.min': 'Available Stock should be greater than zero',
                    'any.required': 'Available Stock is required',
                }),
                stockUnit: commonJoiSchemas.MONGODBID.required().messages({
                    'string.base': 'Stock Unit must be a string',
                    'any.required': 'Stock Unit is required',
                }),
            }),
            profitPercent: Joi.number().min(-100).max(100).required().messages({
                'number.base': 'Profit Percent must be a number',
                'number.min': 'Profit Percent must be greater than zero',
                'number.max': 'Profit Percent must be lesser than 100',
                'any.required': 'Profit Percent is required',
            }),
            taxBracket: Joi.array().items(commonJoiSchemas.MONGODBID),
        });
        const { error, value } = requestBodySchema.validate(req.body, joiSchemaOptions);
        req.body = value;
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
            const {
                name,
                category,
                brand,
                gtinNumber,
                mrpPrice,
                landingPrice,
                sellingPrice,
                stockInformation,
                profitPercent,
                taxBracket,
            } = req.body;
            await ProductModel.create({
                name,
                brand,
                category,
                sellingPrice,
                stockInformation,
                gtinNumber,
                landingPrice,
                mrpPrice,
                profitPercent,
                taxBracket,
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
                    fieldName: inputFieldNames.COMMONMESSAGE,
                    message: e.message,
                },
            ],
        };
    } finally {
        res.send(response);
    }
};

export const deleteProduct: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
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
