import { Model, Document } from 'mongoose';

export enum ESaleStatus {
    COMPLETED = 'COMPLETED',
    PENDING = 'PENDING',
}

interface ISaleItem {
    _id: string;
    product: string;
    quantity: number;
}

export interface ISale {
    status: ESaleStatus;
    products?: ISaleItem[];
    subTotal?: number;
    discountPercent?: number;
    totalTax?: number;
    grandTotal?: number;
}

export type ISaleModel = Model<ISale & Document>;

// interface for response data
export interface IGetSales {
    _id: string;
    status: ESaleStatus;
    products: ISaleItem[];
    subTotal: number;
    discountPercent: number;
    totalTax: number;
    grandTotal: number;
}
