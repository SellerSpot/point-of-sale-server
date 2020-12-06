import { Schema, model, Model, Document } from 'mongoose';
import { EMODELS } from './models.types';

const ProductSchema = new Schema({
    productName: {
        type: Schema.Types.String,
        required: true,
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
    productName: Schema.Types.String;
    gtinNumber?: Schema.Types.String;
    mrpPrice?: Schema.Types.Number;
    landingPrice?: Schema.Types.Number;
    sellingPrice: Schema.Types.Number;
    markup?: {
        value: Schema.Types.Number;
        direction: ['positive', 'negative'];
        valueType: ['percent', 'price'];
    };
    taxBracket?: Schema.Types.ObjectId;
}

export type IProductModel = Model<IProduct & Document>;

export const ProductModel: IProductModel = model(EMODELS.PRODUCT, ProductSchema);
