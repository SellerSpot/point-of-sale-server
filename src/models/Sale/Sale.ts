import { Schema, model, SchemaDefinition } from 'mongoose';
import { EMODELS } from '../models.types';
import { ESaleStatus, ISaleModel } from './Sale.types';

export const saleSchemaDefinition: SchemaDefinition = {
    status: {
        type: Schema.Types.String,
        enum: [ESaleStatus.COMPLETED, ESaleStatus.PENDING],
        required: true,
    },
    products: [
        {
            product: {
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
    subTotal: {
        type: Schema.Types.Number,
        min: 0,
        required: false,
        default: 0,
    },
    discountPercent: {
        type: Schema.Types.Number,
        min: 0,
        max: 100,
        required: false,
        default: 0,
    },
    totalTax: {
        type: Schema.Types.Number,
        min: 0,
        required: false,
        default: 0,
    },
    grandTotal: {
        type: Schema.Types.Number,
        min: 0,
        required: false,
        default: 0,
    },
    createdAt: {
        type: Schema.Types.Number,
        required: true,
    },
};

const SaleSchema = new Schema(saleSchemaDefinition);

export const SaleModel: ISaleModel = model(EMODELS.SALE, SaleSchema);
