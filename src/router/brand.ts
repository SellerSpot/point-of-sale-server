import { getToken } from 'controller/authorization/authorization';
import { authorizationController, brandController } from 'controller/controller';
import { Router } from 'express';
import { isUndefined } from 'lodash';
import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';

const brandRouter: Router = Router();

// get all brands
brandRouter.post(`/${pointOfSaleTypes.ROUTES.BRAND_GET_ALL_BRANDS}`, async (req, res) => {
    let response: pointOfSaleTypes.brandResponseTypes.IGetAllBrands;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await brandController.getAllBrands(tokenPayload.data._id);
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
// get single brand
brandRouter.post(`/${pointOfSaleTypes.ROUTES.BRAND_GET_BRAND}`, async (req, res) => {
    let response: pointOfSaleTypes.brandResponseTypes.IGetBrand;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await brandController.getSingleBrand(req.body);
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
// to create a new brand
brandRouter.post(`/${pointOfSaleTypes.ROUTES.BRAND_CREATE_BRAND}`, async (req, res) => {
    let response: pointOfSaleTypes.brandResponseTypes.ICreateBrand;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await brandController.createBrand(req.body);
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.UNAUTHORIZED,
                error: 'Please verify authentication parameters',
            };
        }
    } catch (error) {
        console.log(error);

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
// to update an existing brand
brandRouter.post(`/${pointOfSaleTypes.ROUTES.BRAND_UPDATE_BRAND}`, async (req, res) => {
    let response: pointOfSaleTypes.brandResponseTypes.IUpdateBrand;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await brandController.updateBrand(req.body);
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
// to delete an existing brand
brandRouter.post(`/${pointOfSaleTypes.ROUTES.BRAND_DELETE_BRAND}`, async (req, res) => {
    let response: pointOfSaleTypes.brandResponseTypes.IDeleteBrand;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await brandController.deleteBrand(req.body);
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

export default brandRouter;
