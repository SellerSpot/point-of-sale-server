import { RequestHandler, Request, Response } from 'express';
import { Connection } from 'mongoose';
import { EMODELS } from '../models/models.types';
import { TaxBracketModel } from '../models';
import { IResponse } from '../typings/request.types';
import Joi from 'joi';
import { commonJoiSchemas, joiSchemaOptions } from '../utils';

const getTaxBracketModel = (currentDb: Connection = global.currentDb): TaxBracketModel.ITaxBracketModel => {
    return currentDb.model(EMODELS.TAXBRACKET);
};

export const getTaxBrackets: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModel = getTaxBracketModel();
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

export const createTaxBracket: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const requestBodySchema = Joi.object({
            name: Joi.string().alphanum().required(),
            taxPercent: Joi.number().max(100).min(0).required(),
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
            const dbModel = getTaxBracketModel();
            const { name, taxPercent } = req.body;
            // checking if TaxBracket already exists
            if ((await dbModel.find({ name: name })).length === 0) {
                await dbModel.create({
                    name: name,
                    taxPercent: taxPercent,
                });
                response = {
                    status: true,
                    statusCode: 'CREATED',
                };
            } else {
                response = {
                    status: false,
                    statusCode: 'CONFLICT',
                    data: 'Tax Bracket already exists in database',
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
                statusCode: 'BADREQUEST',
                data: error.message,
            };
        } else {
            const dbModel = getTaxBracketModel();
            const { taxBracketid } = req.params;
            // checking if TaxBracket already exists
            if ((await dbModel.findById({ taxBracketid })) !== null) {
                await dbModel.findByIdAndDelete({
                    taxBracketid,
                });
                response = {
                    status: true,
                    statusCode: 'NOCONTENT',
                };
            } else {
                response = {
                    status: false,
                    statusCode: 'NOTFOUND',
                    data: 'Tax Bracket does not exist in database',
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
