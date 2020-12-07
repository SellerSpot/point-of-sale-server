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
        const dbModel = getCategoryModel();
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
export const createCategory: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModel = getCategoryModel();
        // checking if category already exists
        if ((await dbModel.find({ name: req.body['categoryName'] })).length === 0) {
            await dbModel.create({
                name: req.body['categoryName'],
            });
            response = {
                status: true,
            };
        } else {
            response = {
                status: false,
                data: 'Category already exists in database',
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
export const updateCategory: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModel = getCategoryModel();
        // checking if category already exists
        if ((await dbModel.find({ name: req.body['categoryName'] })).length !== 0) {
            await dbModel.findOneAndUpdate({ name: req.body['categoryName'] }, { name: req.body['newCategoryName'] });
            response = {
                status: true,
            };
        } else {
            response = {
                status: false,
                data: 'Category does not exist in database',
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
export const deleteCategory: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModel = getCategoryModel();
        // checking if category already exists
        if ((await dbModel.find({ name: req.body['categoryName'] })).length !== 0) {
            await dbModel.findOneAndDelete({ name: req.body['categoryName'] });
            response = {
                status: true,
            };
        } else {
            response = {
                status: false,
                data: 'Category does not exist in database',
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
