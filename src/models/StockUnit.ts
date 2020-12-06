import { Schema, model, Model, Document } from 'mongoose';
import { EMODELS } from './models.types';

const StockUnitSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
});

export interface IStockUnit {
    name: Schema.Types.String;
}

export type IStockUnitModel = Model<IStockUnit & Document>;

export const StockUnitModel: IStockUnitModel = model(EMODELS.STOCKUNIT, StockUnitSchema);
