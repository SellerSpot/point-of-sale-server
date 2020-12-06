import { Schema, model, Model, Document } from 'mongoose';
import { EMODELS } from './models.types';

const TaxBracketSchema = new Schema({
    bracketName: {
        type: Schema.Types.String,
        required: true,
    },
    slabPercentage: {
        type: Schema.Types.Number,
        required: true,
    },
});

export interface ITaxBracket {
    bracketName: Schema.Types.String;
    slabPercentage: Schema.Types.Number;
}

export type ITaxBracketModel = Model<ITaxBracket & Document>;

export const TaxBracketModel: ITaxBracketModel = model(EMODELS.TAXBRACKET, TaxBracketSchema);
