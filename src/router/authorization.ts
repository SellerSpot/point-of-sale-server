import { Router } from 'express';
import { logger } from 'utilities/logger';
import { authorizationController } from '../controller/controller';

const authorizationRouter: Router = Router();

// authorize router
authorizationRouter.post('/', async (req, res) => {
    try {
        const payload = await authorizationController.authorizeTenant(req.body);
        res.send(payload);
    } catch (error) {
        res.send(error);
    }
});

export default authorizationRouter;
