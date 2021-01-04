import { IGetSales } from '../models/Sale/Sale.types';

export interface IResponse {
    status: boolean;
    statusCode: number;
    data?: IGetSales[] | IGetSales | unknown;
    error?: {
        fieldName: string;
        message: string;
    }[];
}
