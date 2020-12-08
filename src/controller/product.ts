import { RequestHandler, Request, Response } from 'express';
import Joi from 'joi';
import { Connection } from 'mongoose';
import { ProductModel } from '../models';
import { EMODELS } from '../models/models.types';
import { IResponse } from '../typings/request.types';
import { commonJoiSchemas, joiSchemaOptions, responseStatusCodes } from '../utils';

const getProductModel = (currentDb: Connection = global.currentDb): ProductModel.IProductModel => {
    return currentDb.model(EMODELS.PRODUCT);
};

export const getProducts: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModel = getProductModel();
        response = {
            status: true,
            statusCode: responseStatusCodes.OK,
            data: await dbModel.find(),
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
            const dbModel = getProductModel();
            const { productid } = req.params;
            // checking if Product already exists
            if ((await dbModel.findById(productid)) !== null) {
                response = {
                    status: true,
                    statusCode: responseStatusCodes.OK,
                    data: await dbModel.findById(productid),
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
            name: Joi.string().required(),
            category: commonJoiSchemas.MONGODBID.required(),
            brand: commonJoiSchemas.MONGODBID.required(),
            gtinNumber: Joi.string(),
            mrpPrice: Joi.number().min(0),
            landingPrice: Joi.number().min(0),
            sellingPrice: Joi.number().min(0),
            stockInformation: Joi.object({
                availableStock: Joi.number().min(0).required(),
                stockUnit: commonJoiSchemas.MONGODBID.required(),
            }),
            profitPercent: Joi.number().min(-100).max(100).required(),
            taxBracket: Joi.array().items(commonJoiSchemas.MONGODBID),
        });
        const { error, value } = requestBodySchema.validate(req.body, joiSchemaOptions);
        req.body = value;
        if (error) {
            response = {
                status: false,
                statusCode: responseStatusCodes.BADREQUEST,
                data: error.message,
            };
        } else {
            const dbModel = getProductModel();
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
            dbModel.create({
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
            };
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
            const dbModel = getProductModel();
            const { productid } = req.params;
            // checking if Product already exists
            if ((await dbModel.findById(productid)) !== null) {
                await dbModel.findByIdAndDelete(productid);
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
