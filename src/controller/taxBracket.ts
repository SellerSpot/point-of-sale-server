import { RequestHandler, Request, Response } from 'express';
import { TaxBracketModelTypes } from '../models';
import Joi from 'joi';
import { commonJoiSchemas, joiSchemaOptions } from '../utilities';
import { getTaxBracketModel } from '../utilities/modelService';
import { IGetTaxBracket } from 'models/TaxBracket/TaxBracket.types';
import { STATUS_CODES } from '@sellerspot/universal-types';

// export const getTaxBrackets: RequestHandler = async (req: Request, res: Response) => {
//     let response: TaxBracketModelTypes.IResponse;
//     try {
//         const TaxBracketModel = getTaxBracketModel(global.currentDb);
//         const taxBracketData: IGetTaxBracket[] = await TaxBracketModel.find();
//         const compiledData: TaxBracketModelTypes.IGetTaxBracket[] = [];
//         taxBracketData.map((taxBracket) => {
//             compiledData.push({
//                 _id: taxBracket._id,
//                 name: taxBracket.name,
//                 taxPercent: taxBracket.taxPercent,
//             });
//         });
//         response = {
//             status: true,
//             statusCode: STATUS_CODES.OK,
//             data: compiledData,
//         };
//     } catch (e) {
//         response = {
//             status: false,
//             statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
//             data: e.message,
//         };
//     } finally {
//         res.send(response);
//     }
// };

// export const createTaxBracket: RequestHandler = async (req: Request, res: Response) => {
//     let response: TaxBracketModelTypes.IResponse;
//     try {
//         const requestBodySchema = Joi.object({
//             name: Joi.string().required().messages({
//                 'string.base': 'Tax Bracket name must be a string',
//                 'any.required': 'Tax Bracket name is required',
//             }),
//             taxPercent: Joi.number().max(100).min(0).required().messages({
//                 'number.base': 'Tax Bracket percent must be a number',
//                 'number.max': 'Tax Bracket percent must be less than 100',
//                 'number.min': 'Tax Bracket percent must be more than 0',
//                 'any.required': 'Tax Bracket percent is required',
//             }),
//         });
//         const { error, value } = requestBodySchema.validate(req.body, joiSchemaOptions);
//         req.body = value;
//         if (error) {
//             response = {
//                 status: false,
//                 statusCode: STATUS_CODES.BAD_REQUEST,
//                 error: error.details.map((fieldError) => {
//                     return {
//                         fieldName: fieldError.context.label,
//                         message: fieldError.message,
//                     };
//                 }),
//             };
//         } else {
//             const TaxBracketModel = getTaxBracketModel(global.currentDb);
//             const { name, taxPercent } = req.body;
//             // checking if TaxBracket already exists
//             if ((await TaxBracketModel.find({ name: name })).length === 0) {
//                 await TaxBracketModel.create({
//                     name: name,
//                     taxPercent: taxPercent,
//                 });
//                 response = {
//                     status: true,
//                     statusCode: STATUS_CODES.CREATED,
//                     data: 'Tax Bracket created successfully',
//                 };
//             } else {
//                 response = {
//                     status: false,
//                     statusCode: STATUS_CODES.CONFLICT,
//                     error: [
//                         {
//                             fieldName: 'name',
//                             message: 'Tax Bracket already exists in database',
//                         },
//                     ],
//                 };
//             }
//         }
//     } catch (e) {
//         response = {
//             status: false,
//             statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
//             error: [
//                 {
//                     fieldName: 'commonMessage',
//                     message: e.message,
//                 },
//             ],
//         };
//     } finally {
//         res.send(response);
//     }
// };

// export const deleteTaxBracket: RequestHandler = async (req: Request, res: Response) => {
//     let response: TaxBracketModelTypes.IResponse;
//     try {
//         const requestParamsSchema = Joi.object({
//             taxBracketid: commonJoiSchemas.MONGODBID.required(),
//         });
//         const { error, value } = requestParamsSchema.validate(req.params, joiSchemaOptions);
//         req.params = value;
//         if (error) {
//             response = {
//                 status: false,
//                 statusCode: STATUS_CODES.BAD_REQUEST,
//                 data: error.message,
//             };
//         } else {
//             const TaxBracketModel = getTaxBracketModel(global.currentDb);
//             const { taxBracketid } = req.params;
//             // checking if TaxBracket already exists
//             if ((await TaxBracketModel.findById(taxBracketid)) !== null) {
//                 await TaxBracketModel.findByIdAndDelete(taxBracketid);
//                 response = {
//                     status: true,
//                     statusCode: STATUS_CODES.NO_CONTENT,
//                 };
//             } else {
//                 response = {
//                     status: false,
//                     statusCode: STATUS_CODES.NOT_FOUND,
//                     data: 'Tax Bracket does not exist in database',
//                 };
//             }
//         }
//     } catch (e) {
//         response = {
//             status: false,
//             statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
//             data: e.message,
//         };
//     } finally {
//         res.send(response);
//     }
// };
