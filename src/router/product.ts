import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
import { productController } from 'controller/controller';
import { Router } from 'express';
import { isUndefined } from 'lodash';

const productRouter: Router = Router();

// get all products
productRouter.get('/', async (_, res) => {
    let response: pointOfSaleTypes.productResponseTypes.IGetProducts;
    try {
        response = await productController.getProducts();
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
productRouter.get('/:id', async (req, res) => {
    let response: pointOfSaleTypes.productResponseTypes.IGetProduct;
    try {
        response = await productController.getSingleProduct({ id: req.params['id'] });
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
productRouter.post('/', async (req, res) => {
    let response: pointOfSaleTypes.productResponseTypes.ICreateProduct;
    try {
        response = await productController.createProduct(req.body);
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
productRouter.put('/', async (req, res) => {
    let response: pointOfSaleTypes.productResponseTypes.IUpdateProduct;
    try {
        response = await productController.updateProduct(req.body);
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
productRouter.delete('/:id', async (req, res) => {
    let response: pointOfSaleTypes.productResponseTypes.IDeleteProduct;
    try {
        response = await productController.deleteProduct({ id: req.params['id'] });
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
