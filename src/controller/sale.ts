import { RequestHandler, Request, Response } from 'express';
import { Connection } from 'mongoose';
import { SaleModel } from '../models';
import { EMODELS } from '../models/models.types';
import { IResponse } from '../typings/request.types';

const getSaleModel = (currentDb: Connection = global.currentDb): SaleModel.ISaleModel => {
    return currentDb.model(EMODELS.SALE);
};

export const getSales: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModel = getSaleModel();
        response = {
            status: true,
            data: await dbModel.find(),
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

export const deleteSale: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModel = getSaleModel();
        const saleId = req.body['saleId'];
        // checking if Sale already exists
        if ((await dbModel.find({ _id: saleId })).length !== 0) {
            await dbModel.findByIdAndDelete({ saleId });
            response = {
                status: true,
            };
        } else {
            response = {
                status: false,
                data: 'Sale does not exist in database',
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
