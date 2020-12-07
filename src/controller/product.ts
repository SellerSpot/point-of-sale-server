import { RequestHandler, Request, Response } from 'express';
import { Connection } from 'mongoose';
import { ProductModel } from '../models';
import { EMODELS } from '../models/models.types';
import { IResponse } from '../typings/request.types';

const getProductModel = (currentDb: Connection = global.currentDb): ProductModel.IProductModel => {
    return currentDb.model(EMODELS.PRODUCT);
};

export const getProducts: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModel = getProductModel();
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

export const deleteProduct: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModel = getProductModel();
        const productId = req.body['productId'];
        // checking if Product already exists
        if ((await dbModel.find({ _id: productId })).length !== 0) {
            await dbModel.findByIdAndDelete({ productId });
            response = {
                status: true,
            };
        } else {
            response = {
                status: false,
                data: 'Product does not exist in database',
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
