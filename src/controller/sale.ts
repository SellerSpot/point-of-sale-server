import { RequestHandler, Request, Response } from 'express';
import Joi from 'joi';
import { ESaleStatus } from '../models/Sale';
import { IResponse } from '../typings/request.types';
import { commonJoiSchemas, joiSchemaOptions, responseStatusCodes } from '../utils';
import { getSaleModel } from '../utils/modelService';

export const getSales: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const SaleModel = getSaleModel();
        response = {
            status: true,
            statusCode: responseStatusCodes.OK,
            data: await SaleModel.find(),
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

export const getSingleSale: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const requestParamsSchema = Joi.object({
            saleid: commonJoiSchemas.MONGODBID.required(),
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
            const SaleModel = getSaleModel();
            const { saleid } = req.params;
            // checking if sale already exists
            if ((await SaleModel.findById(saleid)) !== null) {
                response = {
                    status: true,
                    statusCode: responseStatusCodes.OK,
                    data: await SaleModel.findById(saleid),
                };
            } else {
                response = {
                    status: false,
                    statusCode: responseStatusCodes.NOTFOUND,
                    data: 'Sale does not exist in database',
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

export const createSale: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const requestBodySchema = Joi.object({
            status: Joi.string().valid(ESaleStatus.COMPLETED, ESaleStatus.PENDING).required(),
            products: Joi.array().items({
                product: commonJoiSchemas.MONGODBID.required(),
                quantity: Joi.number().min(0).required(),
            }),
            discountPercent: Joi.number().min(0).max(100),
            totalTax: Joi.number().min(0).required(),
            grandTotal: Joi.number().min(0).required(),
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
            const SaleModel = getSaleModel();
            const { status, grandTotal, products, totalTax, discountPercent } = req.body;
            await SaleModel.create({
                status,
                grandTotal,
                products,
                totalTax,
                discountPercent,
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

export const deleteSale: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const requestParamsSchema = Joi.object({
            saleid: commonJoiSchemas.MONGODBID.required(),
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
            const SaleModel = getSaleModel();
            const { saleid } = req.params;
            // checking if Sale already exists
            if ((await SaleModel.findById(saleid)) !== null) {
                await SaleModel.findByIdAndDelete(saleid);
                response = {
                    status: true,
                    statusCode: responseStatusCodes.NOCONTENT,
                };
            } else {
                response = {
                    status: false,
                    statusCode: responseStatusCodes.NOTFOUND,
                    data: 'Sale does not exist in database',
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
