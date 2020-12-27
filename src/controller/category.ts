import { RequestHandler, Request, Response } from 'express';
import Joi from 'joi';
import { IResponse } from '../typings/request.types';
import { commonJoiSchemas, joiSchemaOptions, responseStatusCodes } from '../utils';
import { getCategoryModel } from '../utils/modelService';

export const getCategories: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const CategoryModel = getCategoryModel();
        response = {
            status: true,
            statusCode: responseStatusCodes.OK,
            data: await CategoryModel.find(),
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
            categoryName: Joi.string().required().messages({
                'string.base': 'Category Name must be a string',
                'any.required': 'Category Name is required',
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
            const CategoryModel = getCategoryModel();
            const { categoryName } = req.body;
            // checking if category already exists
            if ((await CategoryModel.find({ name: categoryName })).length === 0) {
                await CategoryModel.create({
                    name: categoryName,
                });
                response = {
                    status: true,
                    statusCode: responseStatusCodes.CREATED,
                    data: 'Category successfully inserted into database',
                };
            } else {
                response = {
                    status: false,
                    statusCode: responseStatusCodes.CONFLICT,
                    error: [
                        {
                            fieldName: 'categoryName',
                            message: 'Category already exists in database',
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
                    fieldName: 'categoryName',
                    message: e.message,
                },
            ],
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
            const CategoryModel = getCategoryModel();
            const { categoryid } = req.params;
            // checking if category already exists
            if ((await CategoryModel.findById(categoryid)) !== null) {
                await CategoryModel.findByIdAndDelete(categoryid);
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
