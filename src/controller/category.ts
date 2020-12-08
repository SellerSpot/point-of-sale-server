import { RequestHandler, Request, Response } from 'express';
import Joi from 'joi';
import { Connection } from 'mongoose';
import { CategoryModel } from '../models';
import { EMODELS } from '../models/models.types';
import { IResponse } from '../typings/request.types';
import { commonJoiSchemas, joiSchemaOptions } from '../utils';

const getCategoryModel = (currentDb: Connection = global.currentDb): CategoryModel.ICategoryModel => {
    return currentDb.model(EMODELS.CATEGORY);
};

export const getCategories: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModel = getCategoryModel();
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

export const createCategory: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const requestBodySchema = Joi.object({
            categoryName: Joi.string().alphanum().required(),
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
            const dbModel = getCategoryModel();
            const { categoryName } = req.body;
            // checking if category already exists
            if ((await dbModel.find({ name: categoryName })).length === 0) {
                await dbModel.create({
                    name: categoryName,
                });
                response = {
                    status: true,
                    statusCode: 'CREATED',
                };
            } else {
                response = {
                    status: false,
                    statusCode: 'CONFLICT',
                    data: 'Category already exists in database',
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

export const deleteCategory: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const requestParamsSchema = Joi.object({
            categoryid: commonJoiSchemas.MONGODBID.required(),
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
            const dbModel = getCategoryModel();
            const { categoryid } = req.params;
            // checking if category already exists
            if ((await dbModel.findById({ categoryid })) !== null) {
                await dbModel.findByIdAndDelete({ categoryid });
                response = {
                    status: true,
                    statusCode: 'NOCONTENT',
                };
            } else {
                response = {
                    status: false,
                    statusCode: 'NOTFOUND',
                    data: 'Category does not exist in database',
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
