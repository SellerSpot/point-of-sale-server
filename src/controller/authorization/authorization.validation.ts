import Joi from 'joi';

/**
 * Validation for authorizing tenant
 */
export const authorizeTenantValidationSchema = Joi.object({
    domainName: Joi.string().required(),
});
