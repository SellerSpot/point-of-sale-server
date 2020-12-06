import { Schema, model, Model, Document } from 'mongoose';
import { EMODELS } from './models.types';

const SaleSchema = new Schema(
    {
        status: {
            type: Schema.Types.String,
            enum: ['completed', 'pending', 'cancelled'],
            required: true,
        },
        items: [
            {
                itemId: {
                    type: Schema.Types.ObjectId,
                    ref: 'PRODUCT',
                    required: true,
                },
                quantity: {
                    type: Schema.Types.Number,
                    required: true,
                },
            },
        ],
        discount: {
            type: Schema.Types.Number,
            required: false,
        },
        amountPaid: {
            type: Schema.Types.Number,
            required: false,
        },
    },
    { timestamps: true },
);

export interface ISale {
    name: string;
}

export type ISaleModel = Model<ISale & Document>;

export const SaleModel: ISaleModel = model(EMODELS.SALE, SaleSchema);
