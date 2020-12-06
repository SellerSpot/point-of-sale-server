import { Schema, model, Model, Document } from 'mongoose';
import { EMODELS } from './models.types';

export enum ESaleStatus {
    COMPLETED = 'COMPLETED',
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED',
}

const SaleSchema = new Schema(
    {
        status: {
            type: Schema.Types.String,
            enum: ESaleStatus,
            required: true,
        },
        items: [
            {
                itemId: {
                    type: Schema.Types.ObjectId,
                    ref: EMODELS.PRODUCT,
                    required: true,
                },
                quantity: {
                    type: Schema.Types.Number,
                    required: true,
                },
            },
        ],
        discountPercent: {
            type: Schema.Types.Number,
            min: 0,
            max: 100,
            required: false,
        },
        totalTax: {
            type: Schema.Types.Number,
            min: 0,
            required: true,
        },
        grandTotal: {
            type: Schema.Types.Number,
            min: 0,
            required: true,
        },
    },
    { timestamps: true },
);

export interface ISaleItem {
    itemId: Schema.Types.ObjectId;
    quantity: Schema.Types.Number;
}

export interface ISale {
    status: ESaleStatus;
    items: ISaleItem[];
    discountPercent?: Schema.Types.Number;
    totalTax: Schema.Types.Number;
    grandTotal: Schema.Types.Number;
}

export type ISaleModel = Model<ISale & Document>;

export const SaleModel: ISaleModel = model(EMODELS.SALE, SaleSchema);
