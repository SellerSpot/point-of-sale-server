import Joi from 'joi';

/**
 * Validation for authorizing tenant
 */
export const authorizeTenantValidationSchema = Joi.object({
    domainName: Joi.string().required(),
});

/**
 * Validation for authenticate user
 */
export const authenticateUserValidationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    tenantId: Joi.string().required(),
});

/**
 * Validation for verify token
 */
export const verifyTokenValidationSchema = Joi.string().required();
