import { RequestHandler, Request, Response } from 'express';
import { Connection } from 'mongoose';
import { EMODELS } from '../models/models.types';
import { TaxBracketModel } from '../models';
import { IResponse } from '../typings/request.types';

const getTaxBracketModel = (currentDb: Connection = global.currentDb): TaxBracketModel.ITaxBracketModel => {
    return currentDb.model(EMODELS.TAXBRACKET);
};

export const getTaxBrackets: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModal = getTaxBracketModel();
        response = {
            status: true,
            data: await dbModal.find(),
        };
    } catch (e) {
        response = {
            status: false,
            error: e.message,
        };
    } finally {
        res.send(response);
    }
};

export const createTaxBracket: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModal = getTaxBracketModel();
        const taxBracketName = req.body['taxBracketName'];
        // checking if TaxBracket already exists
        if ((await dbModal.find({ name: taxBracketName })).length === 0) {
            await dbModal.create({
                name: taxBracketName,
                taxPercent: req.body['taxBracketPercent'],
            });
            response = {
                status: true,
            };
        } else {
            response = {
                status: false,
                data: 'Tax Bracket already exists in database',
            };
        }
    } catch (e) {
        response = {
            status: false,
            error: e.message,
        };
    } finally {
        res.send(response);
    }
};

export const updateTaxBracket: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModal = getTaxBracketModel();
        const taxBracketName = req.body['taxBracketName'];
        const newTaxBracketName = req.body['newTaxBracketName'];
        const newTaxBracketPercent = req.body['newTaxBracketPercent'];
        // checking if TaxBracket already exists
        if ((await dbModal.find({ name: taxBracketName })).length !== 0) {
            await dbModal.findOneAndUpdate(
                {
                    name: taxBracketName,
                },
                { name: newTaxBracketName, taxPercent: newTaxBracketPercent },
            );
            response = {
                status: true,
            };
        } else {
            response = {
                status: false,
                data: 'Tax Bracket does not exist in database',
            };
        }
    } catch (e) {
        response = {
            status: false,
            error: e.message,
        };
    } finally {
        res.send(response);
    }
};

export const deleteTaxBracket: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModal = getTaxBracketModel();
        const taxBracketName = req.body['taxBracketName'];
        // checking if TaxBracket already exists
        if ((await dbModal.find({ name: taxBracketName })).length !== 0) {
            await dbModal.findOneAndDelete({
                name: taxBracketName,
            });
            response = {
                status: true,
            };
        } else {
            response = {
                status: false,
                data: 'Tax Bracket does not exist in database',
            };
        }
    } catch (e) {
        response = {
            status: false,
            error: e.message,
        };
    } finally {
        res.send(response);
    }
};
