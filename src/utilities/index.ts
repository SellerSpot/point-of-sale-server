import Joi from 'joi';

// joi schema options
export const joiSchemaOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
};

// common joi schemas
export const commonJoiSchemas = {
    MONGODBID: Joi.string().alphanum().length(24).required(),
};
