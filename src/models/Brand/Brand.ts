import { Schema, model, SchemaDefinition } from 'mongoose';
import { EMODELS } from '../models.types';
import { IBrandModel } from './Brand.types';

const brandSchemaDefinition: SchemaDefinition = {
    name: {
        type: Schema.Types.String,
        required: true,
    },
};

const BrandSchema = new Schema(brandSchemaDefinition, { timestamps: true });

export const BrandModel: IBrandModel = model(EMODELS.BRAND, BrandSchema);
