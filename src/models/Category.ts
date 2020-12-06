import { Schema, model, Model, Document } from 'mongoose';
import { EMODELS } from './models.types';

const CategorySchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
});

export interface ICategory {
    name: Schema.Types.String;
}

export type ICategoryModel = Model<ICategory & Document>;

export const CategoryModel: ICategoryModel = model(EMODELS.CATEGORY, CategorySchema);
