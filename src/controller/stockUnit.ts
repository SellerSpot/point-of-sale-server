import { RequestHandler, Request, Response } from 'express';
import Joi from 'joi';
import { IResponse } from '../typings/request.types';
import { commonJoiSchemas, inputFieldNames, joiSchemaOptions, responseStatusCodes } from '../utils';
import { getStockUnitModel } from '../utils/modelService';

export const getStockUnits: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const StockUnitModel = getStockUnitModel();
        response = {
            status: true,
            statusCode: responseStatusCodes.OK,
            data: await StockUnitModel.find(),
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

export const createStockUnit: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const requestBodySchema = Joi.object({
            stockUnitName: Joi.string().alphanum().required().messages({
                'string.base': 'Stock Unit Name must be a string',
                'any.required': 'Stock Unit Name is required',
            }),
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
            const { stockUnitName } = req.body;
            const StockUnitModel = getStockUnitModel();
            // checking if StockUnit already exists
            if ((await StockUnitModel.find({ name: stockUnitName })).length === 0) {
                await StockUnitModel.create({
                    name: stockUnitName,
                });
                response = {
                    status: true,
                    statusCode: responseStatusCodes.CREATED,
                    data: 'Stock Unit successfully created',
                };
            } else {
                response = {
                    status: false,
                    statusCode: responseStatusCodes.CONFLICT,
                    error: [
                        {
                            fieldName: inputFieldNames.ADDSTOCKUNITFIELD,
                            message: 'Stock Unit already exists in database',
                        },
                    ],
                };
            }
        }
    } catch (e) {
        response = {
            status: false,
            statusCode: responseStatusCodes.INTERNALSERVERERROR,
            error: [
                {
                    fieldName: inputFieldNames.ADDSTOCKUNITFIELD,
                    message: e.message,
                },
            ],
        };
    } finally {
        res.send(response);
    }
};

export const deleteStockUnit: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const requestParamsSchema = Joi.object({
            stockunitid: commonJoiSchemas.MONGODBID.required(),
        });
        const { error, value } = requestParamsSchema.validate(req.params, joiSchemaOptions);
        req.params = value;
        if (error) {
        } else {
            const StockUnitModel = getStockUnitModel();
            const { stockunitid } = req.params;
            // checking if StockUnit already exists
            if ((await StockUnitModel.findById(stockunitid)) !== null) {
                await StockUnitModel.findByIdAndDelete(stockunitid);
                response = {
                    status: true,
                    statusCode: responseStatusCodes.NOCONTENT,
                };
            } else {
                response = {
                    status: false,
                    statusCode: responseStatusCodes.NOTFOUND,
                    data: 'Stock Unit does not exist in database',
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
