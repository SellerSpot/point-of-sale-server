import { Model, Document } from 'mongoose';

export interface ITaxBracket {
    name: string;
    taxPercent: string;
}

export type ITaxBracketModel = Model<ITaxBracket & Document>;

export interface IGetTaxBracket {
    _id: string;
    name: string;
    taxPercent: string;
}

// holds common reference for the return type for API
export interface IResponse {
    status: boolean;
    statusCode: number;
    data?: IGetTaxBracket[] | string;
    error?: {
        fieldName: string;
        message: string;
    }[];
}
