import { getToken } from 'controller/authorization/authorization';
import { authorizationController, categoryController } from 'controller/controller';
import { Router } from 'express';
import lodash from 'lodash';
import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';

const categoryRouter: Router = Router();

// get all categories
categoryRouter.post(`/${pointOfSaleTypes.ROUTES.CATEGORY_GET_ALL_CATEGORIES}`, async (req, res) => {
    let response: pointOfSaleTypes.categoryResponseTypes.IGetAllCategories;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));
        if (tokenPayload.status) {
            response = await categoryController.getCategories(tokenPayload.data._id);
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.UNAUTHORIZED,
                error: 'Please verify authentication parameters',
            };
        }
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
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));
        if (tokenPayload.status) {
            response = await categoryController.getSingleCategory(req.body, tokenPayload.data._id);
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.UNAUTHORIZED,
                error: 'Please verify authentication parameters',
            };
        }
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
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));
        if (tokenPayload.status) {
            response = await categoryController.createCategory(req.body, tokenPayload.data._id);
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
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));
        if (tokenPayload.status) {
            response = await categoryController.updateCategory(req.body, tokenPayload.data._id);
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.UNAUTHORIZED,
                error: 'Please verify authentication parameters',
            };
        }
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
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));
        if (tokenPayload.status) {
            response = await categoryController.deleteCategory(req.body, tokenPayload.data._id);
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.UNAUTHORIZED,
                error: 'Please verify authentication parameters',
            };
        }
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
