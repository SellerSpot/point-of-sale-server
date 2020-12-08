import { RequestHandler, Request, Response } from 'express';
import Joi from 'joi';
import { Connection } from 'mongoose';
import { CategoryModel } from '../models';
import { EMODELS } from '../models/models.types';
import { IResponse } from '../typings/request.types';
import { commonJoiSchemas, joiSchemaOptions, responseStatusCodes } from '../utils';

const getCategoryModel = (currentDb: Connection = global.currentDb): CategoryModel.ICategoryModel => {
    return currentDb.model(EMODELS.CATEGORY);
};

export const getCategories: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const CategoryModelReference = getCategoryModel();
        response = {
            status: true,
            statusCode: responseStatusCodes.OK,
            data: await CategoryModelReference.find(),
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
                statusCode: responseStatusCodes.BADREQUEST,
                data: error.message,
            };
        } else {
            const CategoryModelReference = getCategoryModel();
            const { categoryName } = req.body;
            // checking if category already exists
            if ((await CategoryModelReference.find({ name: categoryName })).length === 0) {
                await CategoryModelReference.create({
                    name: categoryName,
                });
                response = {
                    status: true,
                    statusCode: responseStatusCodes.CREATED,
                };
            } else {
                response = {
                    status: false,
                    statusCode: responseStatusCodes.CONFLICT,
                    data: 'Category already exists in database',
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
                statusCode: responseStatusCodes.BADREQUEST,
                data: error.message,
            };
        } else {
            const CategoryModelReference = getCategoryModel();
            const { categoryid } = req.params;
            // checking if category already exists
            if ((await CategoryModelReference.findById(categoryid)) !== null) {
                await CategoryModelReference.findByIdAndDelete(categoryid);
                response = {
                    status: true,
                    statusCode: responseStatusCodes.NOCONTENT,
                };
            } else {
                response = {
                    status: false,
                    statusCode: responseStatusCodes.NOTFOUND,
                    data: 'Category does not exist in database',
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
