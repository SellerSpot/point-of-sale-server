import { Schema, model, Model, Document } from 'mongoose';
import { EMODELS } from './models.types';

const ProductSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: EMODELS.CATEGORY,
        required: false,
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: EMODELS.BRAND,
        required: false,
    },
    gtinNumber: {
        type: Schema.Types.String,
        required: false,
        default: '00000000',
    },
    mrpPrice: {
        type: Schema.Types.Number,
        required: false,
        default: 0,
    },
    landingPrice: {
        type: Schema.Types.Number,
        required: false,
        default: 0,
    },
    sellingPrice: {
        type: Schema.Types.Number,
        required: true,
    },
    stockInformation: {
        availableStock: {
            type: Schema.Types.Number,
            min: 0,
            required: true,
        },
        stockUnit: {
            type: Schema.Types.ObjectId,
            ref: EMODELS.STOCKUNIT,
            required: true,
        },
    },
    profitPercent: {
        type: Schema.Types.Number,
        min: -100,
        max: 100,
        required: true,
    },
    taxBracket: [
        {
            type: Schema.Types.ObjectId,
            required: false,
            ref: EMODELS.TAXBRACKET,
        },
    ],
});

export interface IProduct {
    name: Schema.Types.String;
    category: Schema.Types.ObjectId;
    brand: Schema.Types.ObjectId;
    gtinNumber?: Schema.Types.String;
    mrpPrice?: Schema.Types.Number;
    landingPrice?: Schema.Types.Number;
    sellingPrice: Schema.Types.Number;
    stockInformation: {
        availableStock: Schema.Types.Number;
        stockUnit: Schema.Types.ObjectId;
    };
    profitPercent?: Schema.Types.Number;
    taxBracket?: Schema.Types.ObjectId[];
}

export type IProductModel = Model<IProduct & Document>;

export const ProductModel: IProductModel = model(EMODELS.PRODUCT, ProductSchema);
