import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
import { categoryController } from 'controller/controller';
import { Router } from 'express';
import lodash from 'lodash';

const categoryRouter: Router = Router();

// get all categories
categoryRouter.post(`/${pointOfSaleTypes.ROUTES.CATEGORY_GET_ALL_CATEGORIES}`, async (_, res) => {
    let response: pointOfSaleTypes.categoryResponseTypes.IGetAllCategories;
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
categoryRouter.post(`/${pointOfSaleTypes.ROUTES.CATEGORY_GET_CATEGORY}`, async (req, res) => {
    let response: pointOfSaleTypes.categoryResponseTypes.IGetCategory;
    try {
        response = await categoryController.getSingleCategory(req.body);
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
categoryRouter.post(`/${pointOfSaleTypes.ROUTES.CATEGORY_CREATE_CATEGORY}`, async (req, res) => {
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
categoryRouter.post(`/${pointOfSaleTypes.ROUTES.CATEGORY_UPDATE_CATEGORY}`, async (req, res) => {
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
categoryRouter.post(`/${pointOfSaleTypes.ROUTES.CATEGORY_DELETE_CATEGORY}`, async (req, res) => {
    let response: pointOfSaleTypes.categoryResponseTypes.IDeleteCategory;
    try {
        response = await categoryController.deleteCategory(req.body);
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
