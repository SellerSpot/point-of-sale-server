import { Schema, model } from 'mongoose';
import { EMODELS } from '../models.types';
import { ICategoryModel } from './Category.types';

const CategorySchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
});

export const CategoryModel: ICategoryModel = model(EMODELS.CATEGORY, CategorySchema);
