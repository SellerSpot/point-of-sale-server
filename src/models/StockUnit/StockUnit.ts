import { Schema, model } from 'mongoose';
import { EMODELS } from '../models.types';
import { IStockUnitModel } from './StockUnit.types';

const StockUnitSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
});

export const StockUnitModel: IStockUnitModel = model(EMODELS.STOCKUNIT, StockUnitSchema);
