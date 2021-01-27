import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
import { brandController } from 'controller/controller';
import { Router } from 'express';
import { isUndefined } from 'lodash';
import { SUB_ROUTES } from 'utilities/globalData';

const brandRouter: Router = Router();

// get all brands
brandRouter.post(SUB_ROUTES.BRAND.GET_ALL_BRANDS, async (_, res) => {
    let response: pointOfSaleTypes.brandResponseTypes.IGetBrands;
    try {
        response = await brandController.getBrands();
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
brandRouter.post(SUB_ROUTES.BRAND.GET_BRAND, async (req, res) => {
    let response: pointOfSaleTypes.brandResponseTypes.IGetBrand;
    try {
        response = await brandController.getSingleBrand({ id: req.body['id'] });
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
brandRouter.post(SUB_ROUTES.BRAND.CREATE_BRAND, async (req, res) => {
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
brandRouter.post(SUB_ROUTES.BRAND.UPDATE_BRAND, async (req, res) => {
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
brandRouter.post(SUB_ROUTES.BRAND.DELETE_BRAND, async (req, res) => {
    let response: pointOfSaleTypes.brandResponseTypes.IDeleteBrand;
    try {
        response = await brandController.deleteBrand({ id: req.body['id'] });
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
