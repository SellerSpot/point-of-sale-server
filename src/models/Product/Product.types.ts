import { Model, Document } from 'mongoose';

export interface IProduct {
    name: string;
    category: string;
    brand: string;
    gtinNumber?: string;
    mrpPrice?: number;
    landingPrice?: number;
    sellingPrice: number;
    stockInformation: {
        availableStock: number;
        stockUnit: string;
    };
    profitPercent?: number;
    taxBracket?: string[];
}

export type IProductModel = Model<IProduct & Document>;

// holds common reference for the return type for API
export interface IGetProduct {
    _id: string;
    name: string;
    category: string;
    brand: string;
    gtinNumber: string;
    mrpPrice: number;
    landingPrice: number;
    sellingPrice: number;
    stockInformation: {
        availableStock: number;
        stockUnit: string;
    };
    profitPercent: number;
    taxBracket: string[];
}

export interface IResponse {
    status: boolean;
    statusCode: number;
    data?: IGetProduct[] | IGetProduct | string;
    error?: {
        fieldName: string;
        message: string;
    }[];
}
