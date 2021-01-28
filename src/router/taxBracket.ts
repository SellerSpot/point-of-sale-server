import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
import { taxBracketController } from 'controller/controller';
import { Router } from 'express';
import { isUndefined } from 'lodash';

const taxBracketRouter: Router = Router();

// get all taxBrackets
taxBracketRouter.post(pointOfSaleTypes.ROUTES.TAXBRACKET_GET_ALL_TAXBRACKETS, async (_, res) => {
    let response: pointOfSaleTypes.taxBracketResponseTypes.IGetTaxBrackets;
    try {
        response = await taxBracketController.getTaxBrackets();
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
// get single taxBracket
taxBracketRouter.post(pointOfSaleTypes.ROUTES.TAXBRACKET_GET_TAXBRACKET, async (req, res) => {
    let response: pointOfSaleTypes.taxBracketResponseTypes.IGetTaxBracket;
    try {
        response = await taxBracketController.getSingleTaxBracket(req.body);
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
taxBracketRouter.post(pointOfSaleTypes.ROUTES.TAXBRACKET_CREATE_TAXBRACKET, async (req, res) => {
    let response: pointOfSaleTypes.taxBracketResponseTypes.ICreateTaxBracket;
    try {
        response = await taxBracketController.createTaxBracket(req.body);
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
// to update an existing taxBracket
taxBracketRouter.post(pointOfSaleTypes.ROUTES.TAXBRACKET_UPDATE_TAXBRACKET, async (req, res) => {
    let response: pointOfSaleTypes.taxBracketResponseTypes.IUpdateTaxBracket;
    try {
        response = await taxBracketController.updateTaxBracket(req.body);
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
// to delete an existing taxBracket
taxBracketRouter.post(pointOfSaleTypes.ROUTES.TAXBRACKET_DELETE_TAXBRACKET, async (req, res) => {
    let response: pointOfSaleTypes.taxBracketResponseTypes.IDeleteTaxBracket;
    try {
        response = await taxBracketController.deleteTaxBracket(req.body);
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

export default taxBracketRouter;
