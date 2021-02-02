import { getToken } from 'controller/authorization/authorization';
import { authorizationController, stockUnitController } from 'controller/controller';
import { Router } from 'express';
import { isUndefined } from 'lodash';
import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';

const stockUnitRouter: Router = Router();

// get all stockUnits
stockUnitRouter.post(
    `/${pointOfSaleTypes.ROUTES.STOCKUNIT_GET_ALL_STOCKUNITS}`,
    async (req, res) => {
        let response: pointOfSaleTypes.stockUnitResponseTypes.IGetAllStockUnits;
        try {
            // use verification token like this
            const tokenPayload = await authorizationController.verifyToken(getToken(req));

            if (tokenPayload.status) {
                response = await stockUnitController.getStockUnits(tokenPayload.data._id);
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
// get single stockUnit
stockUnitRouter.post(`/${pointOfSaleTypes.ROUTES.STOCKUNIT_GET_STOCKUNIT}`, async (req, res) => {
    let response: pointOfSaleTypes.stockUnitResponseTypes.IGetStockUnit;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await stockUnitController.getSingleStockUnit(
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
// to create a new stockUnit
stockUnitRouter.post(`/${pointOfSaleTypes.ROUTES.STOCKUNIT_CREATE_STOCKUNIT}`, async (req, res) => {
    let response: pointOfSaleTypes.stockUnitResponseTypes.ICreateStockUnit;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await stockUnitController.createStockUnit(req.body, tokenPayload.data._id);
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
});
// to update an existing stockUnit
stockUnitRouter.post(`/${pointOfSaleTypes.ROUTES.STOCKUNIT_UPDATE_STOCKUNIT}`, async (req, res) => {
    let response: pointOfSaleTypes.stockUnitResponseTypes.IUpdateStockUnit;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await stockUnitController.updateStockUnit(req.body, tokenPayload.data._id);
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
// to delete an existing stockUnit
stockUnitRouter.post(`/${pointOfSaleTypes.ROUTES.STOCKUNIT_DELETE_STOCKUNIT}`, async (req, res) => {
    let response: pointOfSaleTypes.stockUnitResponseTypes.IDeleteStockUnit;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await stockUnitController.deleteStockUnit(req.body, tokenPayload.data._id);
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

export default stockUnitRouter;
