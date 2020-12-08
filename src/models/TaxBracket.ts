import { Schema, model, Model, Document } from 'mongoose';
import { EMODELS } from './models.types';

const TaxBracketSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    taxPercent: {
        type: Schema.Types.Number,
        min: 0,
        max: 100,
        required: true,
    },
});

export interface ITaxBracket {
    name: Schema.Types.String;
    taxPercent: Schema.Types.Number;
}

export type ITaxBracketModel = Model<ITaxBracket & Document>;

export const TaxBracketModel: ITaxBracketModel = model(EMODELS.TAXBRACKET, TaxBracketSchema);
