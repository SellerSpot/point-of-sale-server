import { RequestHandler, Request, Response } from 'express';
import Joi from 'joi';
import { Connection } from 'mongoose';
import { BrandModel } from '../models';
import { EMODELS } from '../models/models.types';
import { IResponse } from '../typings/request.types';
import { commonJoiSchemas, joiSchemaOptions } from '../utils';

const getBrandModel = (currentDb: Connection = global.currentDb): BrandModel.IBrandModel => {
    return currentDb.model(EMODELS.BRAND);
};

export const getBrands: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModel = getBrandModel();
        response = {
            status: true,
            statusCode: 'OK',
            data: await dbModel.find(),
        };
    } catch (e) {
        response = {
            status: false,
            statusCode: 'INTERNALSERVERERROR',
            data: e.message,
        };
    } finally {
        res.send(response);
    }
};

export const createBrand: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const requestBodySchema = Joi.object({
            brandName: Joi.string().alphanum().required(),
        });
        const { error, value } = requestBodySchema.validate(req.body, joiSchemaOptions);
        req.body = value;
        if (error) {
            response = {
                status: false,
                statusCode: 'BADREQUEST',
                data: error.message,
            };
        } else {
            const { brandName } = req.body;
            const dbModel = getBrandModel();
            // checking if brand already exists
            if ((await dbModel.find({ name: brandName })).length === 0) {
                await dbModel.create({
                    name: brandName,
                });
                response = {
                    status: true,
                    statusCode: 'CREATED',
                };
            } else {
                response = {
                    status: false,
                    statusCode: 'CONFLICT',
                    data: 'Brand already exists in database',
                };
            }
        }
    } catch (e) {
        response = {
            status: false,
            statusCode: 'INTERNALSERVERERROR',
            data: e.message,
        };
    } finally {
        res.send(response);
    }
};

export const deleteBrand: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const requestParamsSchema = Joi.object({
            brandid: commonJoiSchemas.MONGODBID.required(),
        });
        const { error, value } = requestParamsSchema.validate(req.params, joiSchemaOptions);
        req.params = value;
        if (error) {
            response = {
                status: false,
                statusCode: 'BADREQUEST',
                data: error.message,
            };
        } else {
            const dbModel = getBrandModel();
            const { brandid } = req.params;
            // checking if brand already exists
            if ((await dbModel.findById({ brandid })) !== null) {
                await dbModel.findByIdAndDelete({
                    brandid,
                });
                response = {
                    status: true,
                    statusCode: 'NOCONTENT',
                };
            } else {
                response = {
                    status: false,
                    statusCode: 'NOTFOUND',
                    data: 'Brand does not exist in database',
                };
            }
        }
    } catch (e) {
        response = {
            status: false,
            statusCode: 'INTERNALSERVERERROR',
            data: e.message,
        };
    } finally {
        res.send(response);
    }
};
