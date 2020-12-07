import { RequestHandler, Request, Response } from 'express';
import { Connection } from 'mongoose';
import { ProductModel } from '../models';
import { EMODELS } from '../models/models.types';
import { IResponse } from '../typings/request.types';

const getProductModal = (currentDb: Connection = global.currentDb): ProductModel.IProductModel => {
    return currentDb.model(EMODELS.PRODUCT);
};

export const getProducts: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModal = getProductModal();
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

export const deleteProduct: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModal = getProductModal();
        const productId = req.body['productId'];
        // checking if Product already exists
        if ((await dbModal.find({ _id: productId })).length !== 0) {
            await dbModal.findByIdAndDelete({ productId });
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
