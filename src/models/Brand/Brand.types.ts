import { Model, Document } from 'mongoose';

export interface IBrand {
    name: string;
}

export type IBrandModel = Model<IBrand & Document>;

// holds common reference for the return type for API
export interface IResponse {
    status: boolean;
    statusCode: number;
    data?: IGetBrands[] | string;
    error?: {
        fieldName: string;
        message: string;
    }[];
}

export interface IGetBrands {
    _id: string;
    name: string;
}
