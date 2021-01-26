import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
import { brandController } from 'controller/controller';
import { Router } from 'express';
import { isUndefined } from 'lodash';

const brandRouter: Router = Router();

// get all brands
brandRouter.get('/', async (_, res) => {
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
brandRouter.get('/:id', async (req, res) => {
    let response: pointOfSaleTypes.brandResponseTypes.IGetBrand;
    try {
        response = await brandController.getSingleBrand({ id: req.params['id'] });
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
brandRouter.post('/', async (req, res) => {
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
brandRouter.put('/', async (req, res) => {
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
brandRouter.delete('/:id', async (req, res) => {
    let response: pointOfSaleTypes.brandResponseTypes.IDeleteBrand;
    try {
        response = await brandController.deleteBrand({ id: req.params['id'] });
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
