import { Schema, model, Model, Document } from 'mongoose';
import { EMODELS } from './models.types';

const ProductSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'CATEGORY',
        required: false,
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'BRAND',
        required: false,
    },
    gtinNumber: {
        type: Schema.Types.String,
        required: false,
    },
    mrpPrice: {
        type: Schema.Types.Number,
        required: false,
    },
    landingPrice: {
        type: Schema.Types.Number,
        required: false,
    },
    sellingPrice: {
        type: Schema.Types.Number,
        required: true,
    },
    stockInformation: {
        availableStock: Schema.Types.Number,
        stockUnit: {
            type: Schema.Types.ObjectId,
            ref: 'STOCKUNIT',
        },
    },
    markup: {
        value: {
            type: Schema.Types.Number,
            required: true,
        },
        direction: {
            type: Schema.Types.String,
            enum: ['positive', 'negative'],
            required: true,
        },
        valueType: {
            type: Schema.Types.String,
            required: true,
            enum: ['percent', 'price'],
        },
    },
    taxBracket: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'taxBrackets',
    },
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
    markup?: {
        value: Schema.Types.Number;
        direction: ['positive', 'negative'];
        valueType: ['percent', 'price'];
    };
    taxBracket?: Schema.Types.ObjectId;
}

export type IProductModel = Model<IProduct & Document>;

export const ProductModel: IProductModel = model(EMODELS.PRODUCT, ProductSchema);
