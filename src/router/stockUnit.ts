import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
import { stockUnitController } from 'controller/controller';
import { Router } from 'express';
import { isUndefined } from 'lodash';

const stockUnitRouter: Router = Router();

// get all stockUnits
stockUnitRouter.get('/', async (_, res) => {
    let response: pointOfSaleTypes.stockUnitResponseTypes.IGetStockUnits;
    try {
        response = await stockUnitController.getStockUnits();
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
// get single stockUnit
stockUnitRouter.get('/:id', async (req, res) => {
    let response: pointOfSaleTypes.stockUnitResponseTypes.IGetStockUnit;
    try {
        response = await stockUnitController.getSingleStockUnit({ id: req.params['id'] });
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
stockUnitRouter.post('/', async (req, res) => {
    let response: pointOfSaleTypes.stockUnitResponseTypes.ICreateStockUnit;
    try {
        response = await stockUnitController.createStockUnit(req.body);
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
stockUnitRouter.put('/', async (req, res) => {
    let response: pointOfSaleTypes.stockUnitResponseTypes.IUpdateStockUnit;
    try {
        response = await stockUnitController.updateStockUnit(req.body);
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
stockUnitRouter.delete('/:id', async (req, res) => {
    let response: pointOfSaleTypes.stockUnitResponseTypes.IDeleteStockUnit;
    try {
        response = await stockUnitController.deleteStockUnit({ id: req.params['id'] });
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
