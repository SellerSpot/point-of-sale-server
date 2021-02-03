import { getToken } from 'controller/authorization/authorization';
import { authorizationController, taxBracketController } from 'controller/controller';
import { Router } from 'express';
import { isUndefined } from 'lodash';
import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';

const taxBracketRouter: Router = Router();

// get all taxBrackets
taxBracketRouter.post(
    `/${pointOfSaleTypes.ROUTES.TAXBRACKET_GET_ALL_TAXBRACKETS}`,
    async (req, res) => {
        let response: pointOfSaleTypes.taxBracketResponseTypes.IGetAllTaxBrackets;
        try {
            // use verification token like this
            const tokenPayload = await authorizationController.verifyToken(getToken(req));

            if (tokenPayload.status) {
                response = await taxBracketController.getTaxBrackets(tokenPayload.data._id);
            } else {
                throw {
                    status: false,
                    statusCode: STATUS_CODES.UNAUTHORIZED,
                    error: 'Please verify authentication parameters',
                };
            }
        } catch (err) {
            // used to handle unexpected and uncaught errors
            response = isUndefined(err.status)
                ? {
                      status: false,
                      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                      error: err.message,
                  }
                : err;
        } finally {
            res.send(response);
        }
    },
);
// get single taxBracket
taxBracketRouter.post(`/${pointOfSaleTypes.ROUTES.TAXBRACKET_GET_TAXBRACKET}`, async (req, res) => {
    let response: pointOfSaleTypes.taxBracketResponseTypes.IGetTaxBracket;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await taxBracketController.getSingleTaxBracket(
                req.body,
                tokenPayload.data._id,
            );
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.UNAUTHORIZED,
                error: 'Please verify authentication parameters',
            };
        }
    } catch (err) {
        // used to handle unexpected and uncaught errors
        response = isUndefined(err.status)
            ? {
                  status: false,
                  statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                  error: err.message,
              }
            : err;
    } finally {
        res.send(response);
    }
});
// to create a new taxBracket
taxBracketRouter.post(
    `/${pointOfSaleTypes.ROUTES.TAXBRACKET_CREATE_TAXBRACKET}`,
    async (req, res) => {
        let response: pointOfSaleTypes.taxBracketResponseTypes.ICreateTaxBracket;
        try {
            // use verification token like this
            const tokenPayload = await authorizationController.verifyToken(getToken(req));

            if (tokenPayload.status) {
                response = await taxBracketController.createTaxBracket(
                    req.body,
                    tokenPayload.data._id,
                );
            } else {
                throw {
                    status: false,
                    statusCode: STATUS_CODES.UNAUTHORIZED,
                    error: 'Please verify authentication parameters',
                };
            }
        } catch (err) {
            console.log(err);

            // used to handle unexpected and uncaught errors
            response = isUndefined(err.status)
                ? {
                      status: false,
                      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                      error: err.message,
                  }
                : err;
        } finally {
            res.send(response);
        }
    },
);
// to update an existing taxBracket
taxBracketRouter.post(
    `/${pointOfSaleTypes.ROUTES.TAXBRACKET_UPDATE_TAXBRACKET}`,
    async (req, res) => {
        let response: pointOfSaleTypes.taxBracketResponseTypes.IUpdateTaxBracket;
        try {
            // use verification token like this
            const tokenPayload = await authorizationController.verifyToken(getToken(req));

            if (tokenPayload.status) {
                response = await taxBracketController.updateTaxBracket(
                    req.body,
                    tokenPayload.data._id,
                );
            } else {
                throw {
                    status: false,
                    statusCode: STATUS_CODES.UNAUTHORIZED,
                    error: 'Please verify authentication parameters',
                };
            }
        } catch (err) {
            // used to handle unexpected and uncaught errors
            response = isUndefined(err.status)
                ? {
                      status: false,
                      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                      error: err.message,
                  }
                : err;
        } finally {
            res.send(response);
        }
    },
);
// to delete an existing taxBracket
taxBracketRouter.post(
    `/${pointOfSaleTypes.ROUTES.TAXBRACKET_DELETE_TAXBRACKET}`,
    async (req, res) => {
        let response: pointOfSaleTypes.taxBracketResponseTypes.IDeleteTaxBracket;
        try {
            // use verification token like this
            const tokenPayload = await authorizationController.verifyToken(getToken(req));

            if (tokenPayload.status) {
                response = await taxBracketController.deleteTaxBracket(
                    req.body,
                    tokenPayload.data._id,
                );
            } else {
                throw {
                    status: false,
                    statusCode: STATUS_CODES.UNAUTHORIZED,
                    error: 'Please verify authentication parameters',
                };
            }
        } catch (err) {
            // used to handle unexpected and uncaught errors
            response = isUndefined(err.status)
                ? {
                      status: false,
                      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                      error: err.message,
                  }
                : err;
        } finally {
            res.send(response);
        }
    },
);

export default taxBracketRouter;
