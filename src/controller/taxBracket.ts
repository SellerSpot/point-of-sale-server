import { RequestHandler, Request, Response } from 'express';
import { IResponse } from '../typings/request.types';
import Joi from 'joi';
import { commonJoiSchemas, inputFieldNames, joiSchemaOptions, responseStatusCodes } from '../utils';
import { getTaxBracketModel } from '../utils/modelService';

export const getTaxBrackets: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const TaxBracketModel = getTaxBracketModel();
        response = {
            status: true,
            statusCode: responseStatusCodes.OK,
            data: await TaxBracketModel.find(),
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

export const createTaxBracket: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const requestBodySchema = Joi.object({
            name: Joi.string().required().messages({
                'string.base': 'Tax Bracket name must be a string',
                'any.required': 'Tax Bracket name is required',
            }),
            taxPercent: Joi.number().max(100).min(0).required().messages({
                'number.base': 'Tax Bracket percent must be a number',
                'any.required': 'Tax Bracket percent is required',
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
            const TaxBracketModel = getTaxBracketModel();
            const { name, taxPercent } = req.body;
            // checking if TaxBracket already exists
            if ((await TaxBracketModel.find({ name: name })).length === 0) {
                await TaxBracketModel.create({
                    name: name,
                    taxPercent: taxPercent,
                });
                response = {
                    status: true,
                    statusCode: responseStatusCodes.CREATED,
                    data: 'Tax Bracket created successfully',
                };
            } else {
                response = {
                    status: false,
                    statusCode: responseStatusCodes.CONFLICT,
                    error: [
                        {
                            fieldName: inputFieldNames.ADDTAXBRACKETNAMEFIELD,
                            message: 'Tax Bracket already exists in database',
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
                    fieldName: inputFieldNames.COMMONMESSAGE,
                    message: e.message,
                },
            ],
        };
    } finally {
        res.send(response);
    }
};

export const deleteTaxBracket: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const requestParamsSchema = Joi.object({
            taxBracketid: commonJoiSchemas.MONGODBID.required(),
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
            const TaxBracketModel = getTaxBracketModel();
            const { taxBracketid } = req.params;
            // checking if TaxBracket already exists
            if ((await TaxBracketModel.findById(taxBracketid)) !== null) {
                await TaxBracketModel.findByIdAndDelete(taxBracketid);
                response = {
                    status: true,
                    statusCode: responseStatusCodes.NOCONTENT,
                };
            } else {
                response = {
                    status: false,
                    statusCode: responseStatusCodes.NOTFOUND,
                    data: 'Tax Bracket does not exist in database',
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
