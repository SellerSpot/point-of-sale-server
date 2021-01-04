import { Model, Document } from 'mongoose';

export interface ICategory {
    name: string;
}

export type ICategoryModel = Model<ICategory & Document>;

// holds common reference for the return type for API
export interface IGetCategory {
    _id: string;
    name: string;
}

export interface IResponse {
    status: boolean;
    statusCode: number;
    data?: IGetCategory[] | string;
    error?: {
        fieldName: string;
        message: string;
    }[];
}
