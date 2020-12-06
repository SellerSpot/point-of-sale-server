import { RequestHandler, Request, Response } from 'express';
import { Connection } from 'mongoose';
import { CategoryModel } from '../models';
import { EMODELS } from '../models/models.types';
import { IResponse } from '../typings/request.types';

const getCategoryModel = (currentDb: Connection = global.currentDb): CategoryModel.ICategoryModel => {
    return currentDb.model(EMODELS.CATEGORY);
};

export const getCategories: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModal = getCategoryModel();
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
export const createCategory: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModal = getCategoryModel();
        await dbModal.create({
            name: req.body['category'],
        });
        response = {
            status: true,
        };
    } catch (e: unknown) {
        response = {
            status: true,
            error: e,
        };
    } finally {
        res.send(response);
    }
};
// export const updateCategory: RequestHandler = (req: Request, res: Response) => {
//     const dbModal = getCategoryModel();
// };
// export const deleteCategory: RequestHandler = (req: Request, res: Response) => {
//     const dbModal = getCategoryModel();
// };
