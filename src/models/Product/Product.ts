import { Schema, model } from 'mongoose';
import { EMODELS } from '../models.types';
import { IProductModel } from './Product.types';

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

export const ProductModel: IProductModel = model(EMODELS.PRODUCT, ProductSchema);
