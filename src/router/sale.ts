import { getToken } from 'controller/authorization/authorization';
import { authorizationController, saleController } from 'controller/controller';
import { Router } from 'express';
import { isUndefined } from 'lodash';
import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';

const saleRouter: Router = Router();

// get all sales
saleRouter.post(`/${pointOfSaleTypes.ROUTES.SALE_GET_ALL_SALES}`, async (req, res) => {
    let response: pointOfSaleTypes.saleResponseTypes.IGetAllSales;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await saleController.getSales(tokenPayload.data._id);
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
// get single sale
saleRouter.post(`/${pointOfSaleTypes.ROUTES.SALE_GET_SALE}`, async (req, res) => {
    let response: pointOfSaleTypes.saleResponseTypes.IGetSale;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await saleController.getSingleSale(req.body, tokenPayload.data._id);
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
// to create a new sale
saleRouter.post(`/${pointOfSaleTypes.ROUTES.SALE_CREATE_SALE}`, async (req, res) => {
    let response: pointOfSaleTypes.saleResponseTypes.ICreateSale;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await saleController.createSale(req.body, tokenPayload.data._id);
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
// to update an existing sale
saleRouter.post(`/${pointOfSaleTypes.ROUTES.SALE_UPDATE_SALE}`, async (req, res) => {
    let response: pointOfSaleTypes.saleResponseTypes.IUpdateSale;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await saleController.updateSale(req.body, tokenPayload.data._id);
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
// to delete an existing sale
saleRouter.post(`/${pointOfSaleTypes.ROUTES.SALE_DELETE_SALE}`, async (req, res) => {
    let response: pointOfSaleTypes.saleResponseTypes.IDeleteSale;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await saleController.deleteSale(req.body, tokenPayload.data._id);
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

export default saleRouter;
