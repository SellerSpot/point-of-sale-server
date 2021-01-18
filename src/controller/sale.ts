import { RequestHandler, Request, Response } from 'express';
import Joi from 'joi';
import lodash from 'lodash';
import { IGetSales } from 'models/Sale/Sale.types';
import { SaleModelTypes } from '../models';
import { commonJoiSchemas, joiSchemaOptions, responseStatusCodes } from '../utilities';
import { getSaleModel } from '../utilities/modelService';

export const getSales: RequestHandler = async (req: Request, res: Response) => {
    let response: SaleModelTypes.IResponse;
    try {
        const SaleModel = getSaleModel();
        const allSalesData: IGetSales[] = await SaleModel.find();
        // variable to hold the compiled data to send as response
        const compiledData: SaleModelTypes.IGetSales[] = [];
        // push all data to array to send as response data
        allSalesData.map((sale) => {
            compiledData.push({
                _id: sale._id,
                createdAt: sale.createdAt,
                discountPercent: sale.discountPercent,
                grandTotal: sale.grandTotal,
                products: sale.products,
                status: sale.status,
                subTotal: sale.subTotal,
                totalTax: sale.totalTax,
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

export const getSingleSale: RequestHandler = async (req: Request, res: Response) => {
    let response: SaleModelTypes.IResponse;
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
            const saleData = await SaleModel.findById(saleid);
            if (!lodash.isNull(saleData)) {
                response = {
                    status: true,
                    statusCode: responseStatusCodes.OK,
                    data: {
                        _id: saleData._id,
                        createdAt: saleData.createdAt,
                        discountPercent: saleData.discountPercent,
                        grandTotal: saleData.grandTotal,
                        products: saleData.products,
                        status: saleData.status,
                        subTotal: saleData.subTotal,
                        totalTax: saleData.totalTax,
                    },
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
    let response: SaleModelTypes.IResponse;
    try {
        // to validate the data passed
        const requestBodySchema = Joi.object<SaleModelTypes.ISale>({
            status: Joi.string()
                .valid(SaleModelTypes.ESaleStatus.COMPLETED, SaleModelTypes.ESaleStatus.PENDING)
                .required()
                .messages({
                    'any.required': 'Status is a required field',
                }),
            products: Joi.array().items({
                product: commonJoiSchemas.MONGODBID.required(),
                quantity: Joi.number().min(0).required(),
            }),
            subTotal: Joi.number().min(0),
            discountPercent: Joi.number().min(0).max(100),
            totalTax: Joi.number().min(0),
            grandTotal: Joi.number().min(0),
            createdAt: Joi.number().required(),
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
            const {
                status,
                grandTotal,
                products,
                totalTax,
                subTotal,
                discountPercent,
                createdAt,
            } = req.body as SaleModelTypes.ISale;
            await SaleModel.create<SaleModelTypes.ISale>({
                status,
                grandTotal,
                products,
                totalTax,
                subTotal,
                createdAt,
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
    let response: SaleModelTypes.IResponse;
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
            if (!lodash.isNull(await SaleModel.findById(saleid))) {
                await SaleModel.findByIdAndDelete(saleid);
                response = {
                    status: true,
                    statusCode: responseStatusCodes.NOCONTENT,
                    data: 'Sale deleted successfully',
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
