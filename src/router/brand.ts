import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
import { getToken } from 'controller/authorization/authorization';
import { authorizationController, brandController } from 'controller/controller';
import { Router } from 'express';
import { isUndefined } from 'lodash';
import { logger } from 'utilities/logger';

const brandRouter: Router = Router();

// get all brands
brandRouter.post(`/${pointOfSaleTypes.ROUTES.BRAND_GET_ALL_BRANDS}`, async (req, res) => {
    let response: pointOfSaleTypes.brandResponseTypes.IGetAllBrands;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));
        if (tokenPayload.status) {
            // you could access all tenant info from tokenPayload.data
            logger.common(tokenPayload.data._id); // tenant id (use this id to query from with database you wantto)
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.UNAUTHORIZED,
                error: 'Invalid user token',
            };
        }
        response = await brandController.getAllBrands(tokenPayload.data._id);
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
// get single brand
brandRouter.post(`/${pointOfSaleTypes.ROUTES.BRAND_GET_BRAND}`, async (req, res) => {
    let response: pointOfSaleTypes.brandResponseTypes.IGetBrand;
    try {
        response = await brandController.getSingleBrand(req.body);
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
// to create a new brand
brandRouter.post(`/${pointOfSaleTypes.ROUTES.BRAND_CREATE_BRAND}`, async (req, res) => {
    let response: pointOfSaleTypes.brandResponseTypes.ICreateBrand;
    try {
        response = await brandController.createBrand(req.body);
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
// to update an existing brand
brandRouter.post(`/${pointOfSaleTypes.ROUTES.BRAND_UPDATE_BRAND}`, async (req, res) => {
    let response: pointOfSaleTypes.brandResponseTypes.IUpdateBrand;
    try {
        response = await brandController.updateBrand(req.body);
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
// to delete an existing brand
brandRouter.post(`/${pointOfSaleTypes.ROUTES.BRAND_DELETE_BRAND}`, async (req, res) => {
    let response: pointOfSaleTypes.brandResponseTypes.IDeleteBrand;
    try {
        response = await brandController.deleteBrand(req.body);
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

export default brandRouter;
