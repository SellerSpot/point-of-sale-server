import { RequestHandler, Request, Response } from 'express';
import { Connection } from 'mongoose';
import { StockUnitModel } from '../models';
import { EMODELS } from '../models/models.types';
import { IResponse } from '../typings/request.types';

const getStockUnitModel = (currentDb: Connection = global.currentDb): StockUnitModel.IStockUnitModel => {
    return currentDb.model(EMODELS.STOCKUNIT);
};

export const getStockUnits: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModel = getStockUnitModel();
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

export const createStockUnit: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModel = getStockUnitModel();
        const stockUnitName = req.body['stockUnitName'];
        // checking if StockUnit already exists
        if ((await dbModel.find({ name: stockUnitName })).length === 0) {
            await dbModel.create({
                name: stockUnitName,
            });
            response = {
                status: true,
            };
        } else {
            response = {
                status: false,
                data: 'Stock Unit already exists in database',
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

// export const updateStockUnit: RequestHandler = async (req: Request, res: Response) => {
//     const type = {};
//     let response: IResponse;
//     try {
//         const dbModel = getStockUnitModel();
//         const stockUnitName = req.body['stockUnitName'];
//         const newStockUnitName = req.body['newStockUnitName'];
//         // checking if StockUnit already exists
//         if ((await dbModel.find({ name: stockUnitName })).length !== 0) {
//             await dbModel.findOneAndUpdate(
//                 {
//                     name: stockUnitName,
//                 },
//                 { name: newStockUnitName },
//             );
//             response = {
//                 status: true,
//             };
//         } else {
//             response = {
//                 status: false,
//                 data: 'Stock Unit does not exist in database',
//             };
//         }
//     } catch (e) {
//         response = {
//             status: false,
//             error: e.message,
//         };
//     } finally {
//         res.send(response);
//     }
// };

export const deleteStockUnit: RequestHandler = async (req: Request, res: Response) => {
    let response: IResponse;
    try {
        const dbModel = getStockUnitModel();
        const stockUnitName = req.body['stockUnitName'];
        // checking if StockUnit already exists
        if ((await dbModel.find({ name: stockUnitName })).length !== 0) {
            await dbModel.findOneAndDelete({
                name: stockUnitName,
            });
            response = {
                status: true,
            };
        } else {
            response = {
                status: false,
                data: 'Stock Unit does not exist in database',
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
