import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
import { categoryController } from 'controller/controller';
import { Router } from 'express';
import lodash from 'lodash';

const categoryRouter: Router = Router();

// get all categorys
categoryRouter.get('/', async (_, res) => {
    let response: pointOfSaleTypes.categoryResponseTypes.IGetCategory;
    try {
        response = await categoryController.getCategories();
    } catch (err) {
        // used to handle unexpected and uncaught errors
        response = lodash.isUndefined(err.status)
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
// get single category
categoryRouter.get('/:id', async (req, res) => {
    let response: pointOfSaleTypes.categoryResponseTypes.IGetCategory;
    try {
        response = await categoryController.getSingleCategory({ id: req.params['id'] });
    } catch (err) {
        // used to handle unexpected and uncaught errors
        response = lodash.isUndefined(err.status)
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
// to create a new category
categoryRouter.post('/', async (req, res) => {
    let response: pointOfSaleTypes.categoryResponseTypes.ICreateCategory;
    try {
        response = await categoryController.createCategory(req.body);
    } catch (err) {
        console.log(err);

        // used to handle unexpected and uncaught errors
        response = lodash.isUndefined(err.status)
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
// to update an existing category
categoryRouter.put('/', async (req, res) => {
    let response: pointOfSaleTypes.categoryResponseTypes.IUpdateCategory;
    try {
        response = await categoryController.updateCategory(req.body);
    } catch (err) {
        // used to handle unexpected and uncaught errors
        response = lodash.isUndefined(err.status)
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
// to delete an existing category
categoryRouter.delete('/:id', async (req, res) => {
    let response: pointOfSaleTypes.categoryResponseTypes.IDeleteCategory;
    try {
        response = await categoryController.deleteCategory({ id: req.params['id'] });
    } catch (err) {
        // used to handle unexpected and uncaught errors
        response = lodash.isUndefined(err.status)
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

export default categoryRouter;
