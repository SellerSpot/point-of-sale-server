import { Model, Document } from 'mongoose';

export interface IStockUnit {
    name: string;
}

// holds common reference for the return type for API
export interface IGetStockUnit {
    _id: string;
    name: string;
}

export interface IResponse {
    status: boolean;
    statusCode: number;
    data?: IGetStockUnit[] | string;
    error?: {
        fieldName: string;
        message: string;
    }[];
}

export type IStockUnitModel = Model<IStockUnit & Document>;
