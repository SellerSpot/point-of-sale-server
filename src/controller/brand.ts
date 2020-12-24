import { RequestHandler, Request, Response } from 'express';
import Joi from 'joi';
import { IResponse } from '../typings/request.types';
import { commonJoiSchemas, inputFieldNames, joiSchemaOptions, responseStatusCodes } from '../utils';
import { getBrandModel } from '../utils/modelService';

export const getBrands: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const BrandModel = getBrandModel();
        response = {
            status: true,
            statusCode: responseStatusCodes.OK,
            data: await BrandModel.find(),
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
                statusCode: responseStatusCodes.BADREQUEST,
                error: [
                    {
                        fieldName: inputFieldNames.ADDBRANDFIELD,
                        message: error.message,
                    },
                ],
            };
        } else {
            const { brandName } = req.body;
            const BrandModel = getBrandModel();
            // checking if brand already exists
            if ((await BrandModel.find({ name: brandName })).length === 0) {
                await BrandModel.create({
                    name: brandName,
                });
                response = {
                    status: true,
                    statusCode: responseStatusCodes.CREATED,
                    data: [
                        {
                            fieldName: inputFieldNames.ADDBRANDFIELD,
                            message: 'Brand created successfully',
                        },
                    ],
                };
            } else {
                response = {
                    status: false,
                    statusCode: responseStatusCodes.CONFLICT,
                    error: [
                        {
                            fieldName: inputFieldNames.ADDBRANDFIELD,
                            message: 'Brand already exists in database',
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
                    fieldName: inputFieldNames.ADDBRANDFIELD,
                    message: e.message,
                },
            ],
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
                statusCode: responseStatusCodes.BADREQUEST,
                data: error.message,
            };
        } else {
            const BrandModel = getBrandModel();
            const { brandid } = req.params;
            // checking if brand already exists
            if ((await BrandModel.findById(brandid)) !== null) {
                await BrandModel.findByIdAndDelete(brandid);
                response = {
                    status: true,
                    statusCode: responseStatusCodes.NOCONTENT,
                };
            } else {
                response = {
                    status: false,
                    statusCode: responseStatusCodes.NOTFOUND,
                    data: 'Brand does not exist in database',
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
