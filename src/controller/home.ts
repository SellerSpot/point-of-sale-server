import { RequestHandler, Request, Response } from 'express';
import { Connection } from 'mongoose';
import { IBaseModel } from '../models';
import { EMODELS } from '../models/models.types';

export const homeController: RequestHandler = (req: Request, res: Response) => {
    const dbConnection: Connection = global.currentDb;
    const BaseModel: IBaseModel = dbConnection.model(EMODELS.BASE);
    const base = new BaseModel({
        name: 'test-name',
    });
    base.save({}, (err, doc) => {
        res.send({
            status: true,
            message: 'SellerSpot POS Server API service',
            body: doc,
        });
    });
};
