import { getToken } from 'controller/authorization/authorization';
import { Router } from 'express';
import { isUndefined } from 'lodash';
import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
import { authorizationController } from '../controller/controller';

const authorizationRouter: Router = Router();

// authorize router
authorizationRouter.post(`/${pointOfSaleTypes.ROUTES.AUTHORIZE}`, async (req, res) => {
    let response: pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse;
    try {
        response = await authorizationController.authorizeTenant(req.body);
    } catch (error) {
        // used to handle unexpected and uncaught errors
        response = isUndefined(error.status)
            ? {
                  status: false,
                  statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                  error: error.message,
              }
            : error;
    } finally {
        res.send(response);
    }
});

// authenticate user router
authorizationRouter.post(`/${pointOfSaleTypes.ROUTES.AUTHENTICATE}`, async (req, res) => {
    let response: pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse;
    try {
        const tokenPayload = await authorizationController.verifyToken(getToken(req));
        if (tokenPayload.status) {
            response = await authorizationController.authenticateUser({
                ...req.body,
                tenantId: tokenPayload.data._id,
            });
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.UNAUTHORIZED,
                error: 'Please verify authentication parameters',
            };
        }
    } catch (error) {
        // used to handle unexpected and uncaught errors
        response = isUndefined(error.status)
            ? {
                  status: false,
                  statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                  error: error.message,
              }
            : error;
    } finally {
        res.send(response);
    }
});

// authenticate user router
authorizationRouter.post(`/${pointOfSaleTypes.ROUTES.VERIFY_TOKEN}`, async (req, res) => {
    let response: pointOfSaleTypes.authResponseTypes.IVerifyTokenResponse;
    try {
        const tokenPayload = await authorizationController.verifyToken(getToken(req));
        response = tokenPayload;
    } catch (error) {
        // used to handle unexpected and uncaught errors
        response = isUndefined(error.status)
            ? {
                  status: false,
                  statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                  error: error.message,
              }
            : error;
    } finally {
        res.send(response);
    }
});

export default authorizationRouter;
