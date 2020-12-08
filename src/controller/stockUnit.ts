import { RequestHandler, Request, Response } from 'express';
import Joi from 'joi';
import { Connection } from 'mongoose';
import { StockUnitModel } from '../models';
import { EMODELS } from '../models/models.types';
import { IResponse } from '../typings/request.types';
import { commonJoiSchemas, joiSchemaOptions, responseStatusCodes } from '../utils';

const getStockUnitModel = (currentDb: Connection = global.currentDb): StockUnitModel.IStockUnitModel => {
    return currentDb.model(EMODELS.STOCKUNIT);
};

export const getStockUnits: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModel = getStockUnitModel();
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

export const createStockUnit: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const requestBodySchema = Joi.object({
            stockUnitName: Joi.string().alphanum().required(),
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
            const { stockUnitName } = req.body;
            const dbModel = getStockUnitModel();
            // checking if StockUnit already exists
            if ((await dbModel.find({ name: stockUnitName })).length === 0) {
                await dbModel.create({
                    name: stockUnitName,
                });
                response = {
                    status: true,
                    statusCode: responseStatusCodes.CREATED,
                };
            } else {
                response = {
                    status: false,
                    statusCode: responseStatusCodes.CONFLICT,
                    data: 'Stock Unit already exists in database',
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
            const dbModel = getStockUnitModel();
            const { stockunitid } = req.params;
            // checking if StockUnit already exists
            if ((await dbModel.findById(stockunitid)) !== null) {
                await dbModel.findByIdAndDelete(stockunitid);
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
