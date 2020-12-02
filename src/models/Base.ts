import { Schema, model, Model, Document } from 'mongoose';
import { EMODELS } from './models.types';

const BaseSchema = new Schema({
    name: String,
});

export interface IBase {
    name: string;
}

export type IBaseModel = Model<IBase & Document>;

export const BaseModel: IBaseModel = model(EMODELS.BASE, BaseSchema);
