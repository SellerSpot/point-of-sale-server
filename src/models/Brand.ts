import { Schema, model, Model, Document } from 'mongoose';
import { EMODELS } from './models.types';

const BrandSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
});

export interface IBrand {
    name: Schema.Types.String;
}

export type IBrandModel = Model<IBrand & Document>;

export const BrandModel: IBrandModel = model(EMODELS.BRAND, BrandSchema);
