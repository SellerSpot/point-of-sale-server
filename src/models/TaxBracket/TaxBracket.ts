import { Schema, model } from 'mongoose';
import { EMODELS } from '../models.types';
import { ITaxBracketModel } from './TaxBracket.types';

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

export const TaxBracketModel: ITaxBracketModel = model(EMODELS.TAXBRACKET, TaxBracketSchema);
