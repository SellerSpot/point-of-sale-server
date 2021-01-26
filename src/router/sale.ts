import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
import { saleController } from 'controller/controller';
import { Router } from 'express';
import { isUndefined } from 'lodash';

const saleRouter: Router = Router();

// get all sales
saleRouter.get('/', async (_, res) => {
    let response: pointOfSaleTypes.saleResponseTypes.IGetSales;
    try {
        response = await saleController.getSales();
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
saleRouter.get('/:id', async (req, res) => {
    let response: pointOfSaleTypes.saleResponseTypes.IGetSale;
    try {
        response = await saleController.getSingleSale({ id: req.params['id'] });
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
saleRouter.post('/', async (req, res) => {
    let response: pointOfSaleTypes.saleResponseTypes.ICreateSale;
    try {
        response = await saleController.createSale(req.body);
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
saleRouter.put('/', async (req, res) => {
    let response: pointOfSaleTypes.saleResponseTypes.IUpdateSale;
    try {
        response = await saleController.updateSale(req.body);
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
saleRouter.delete('/:id', async (req, res) => {
    let response: pointOfSaleTypes.saleResponseTypes.IDeleteSale;
    try {
        response = await saleController.deleteSale({ id: req.params['id'] });
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
