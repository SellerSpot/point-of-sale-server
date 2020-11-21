import { Schema, model, Model, Document } from 'mongoose';
import { EMODELS } from './models.types';

export interface IBase {
    name: string;
}

export type IBaseModel = Model<IBase & Document>;

const BaseSchema = new Schema({
    name: String,
});

export const BaseModel: IBaseModel = model(EMODELS.BASE, new Schema(BaseSchema));
