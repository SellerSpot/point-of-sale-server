import { RequestHandler, Request, Response } from 'express';
import { Connection } from 'mongoose';
import { BrandModel } from '../models';
import { EMODELS } from '../models/models.types';
import { IResponse } from '../typings/request.types';

const getBrandModel = (currentDb: Connection = global.currentDb): BrandModel.IBrandModel => {
    return currentDb.model(EMODELS.BRAND);
};

export const getBrands: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModal = getBrandModel();
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

export const createBrand: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModal = getBrandModel();
        // checking if brand already exists
        if ((await dbModal.find({ name: req.body['brandName'] })).length === 0) {
            await dbModal.create({
                name: req.body['brandName'],
            });
            response = {
                status: true,
            };
        } else {
            response = {
                status: false,
                data: 'Brand already exists in database',
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

export const updateBrand: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModal = getBrandModel();
        // checking if brand already exists
        if ((await dbModal.find({ name: req.body['brandName'] })).length !== 0) {
            await dbModal.findOneAndUpdate(
                {
                    name: req.body['brandName'],
                },
                { name: req.body['newBrandName'] },
            );
            response = {
                status: true,
            };
        } else {
            response = {
                status: false,
                data: 'Brand does not exist in database',
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

export const deleteBrand: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModal = getBrandModel();
        // checking if brand already exists
        if ((await dbModal.find({ name: req.body['brandName'] })).length !== 0) {
            await dbModal.findOneAndDelete({
                name: req.body['brandName'],
            });
            response = {
                status: true,
            };
        } else {
            response = {
                status: false,
                data: 'Brand does not exist in database',
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
