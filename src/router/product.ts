import { getToken } from 'controller/authorization/authorization';
import { authorizationController, productController } from 'controller/controller';
import { Router } from 'express';
import { isUndefined } from 'lodash';
import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';

const productRouter: Router = Router();

// get all products
productRouter.post(`/${pointOfSaleTypes.ROUTES.PRODUCT_GET_ALL_PRODUCTS}`, async (req, res) => {
    let response: pointOfSaleTypes.productResponseTypes.IGetAllProducts;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await productController.getProducts(tokenPayload.data._id);
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.UNAUTHORIZED,
                error: 'Please verify authentication parameters',
            };
        }
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
// get single product
productRouter.post(`/${pointOfSaleTypes.ROUTES.PRODUCT_GET_PRODUCT}`, async (req, res) => {
    let response: pointOfSaleTypes.productResponseTypes.IGetProduct;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await productController.getSingleProduct(req.body, tokenPayload.data._id);
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.UNAUTHORIZED,
                error: 'Please verify authentication parameters',
            };
        }
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
// to create a new product
productRouter.post(`/${pointOfSaleTypes.ROUTES.PRODUCT_CREATE_PRODUCT}`, async (req, res) => {
    let response: pointOfSaleTypes.productResponseTypes.ICreateProduct;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await productController.createProduct(req.body, tokenPayload.data._id);
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
// to update an existing product
productRouter.post(`/${pointOfSaleTypes.ROUTES.PRODUCT_UPDATE_PRODUCT}`, async (req, res) => {
    let response: pointOfSaleTypes.productResponseTypes.IUpdateProduct;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await productController.updateProduct(req.body, tokenPayload.data._id);
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.UNAUTHORIZED,
                error: 'Please verify authentication parameters',
            };
        }
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
// to delete an existing product
productRouter.post(`/${pointOfSaleTypes.ROUTES.PRODUCT_DELETE_PRODUCT}`, async (req, res) => {
    let response: pointOfSaleTypes.productResponseTypes.IDeleteProduct;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await productController.deleteProduct(req.body, tokenPayload.data._id);
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.UNAUTHORIZED,
                error: 'Please verify authentication parameters',
            };
        }
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
// to search for a product
productRouter.post(`/${pointOfSaleTypes.ROUTES.PRODUCT_SEARCH_PRODUCT}`, async (req, res) => {
    let response: pointOfSaleTypes.productResponseTypes.ISearchProduct;
    try {
        // use verification token like this
        const tokenPayload = await authorizationController.verifyToken(getToken(req));

        if (tokenPayload.status) {
            response = await productController.searchProducts(req.body, tokenPayload.data._id);
        } else {
            throw {
                status: false,
                statusCode: STATUS_CODES.UNAUTHORIZED,
                error: 'Please verify authentication parameters',
            };
        }
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

export default productRouter;
