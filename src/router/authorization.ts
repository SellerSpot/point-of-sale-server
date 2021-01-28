import { pointOfSaleTypes, STATUS_CODES } from '@sellerspot/universal-types';
import { Router } from 'express';
import { isUndefined } from 'lodash';
import { authorizationController } from '../controller/controller';

const authorizationRouter: Router = Router();

// authorize router
authorizationRouter.post('/', async (req, res) => {
    let response: pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse;
    try {
        response = await authorizationController.authorizeTenant(req.body);
    } catch (error) {
        // used to handle unexpected and uncaught errors
        response = isUndefined(error.status)
            ? {
                  status: false,
                  statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                  error: error.message,
              }
            : error;
    } finally {
        res.send(response);
    }
});

export default authorizationRouter;
