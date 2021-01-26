import { Router } from 'express';
import { authorization } from '../controller/controller';

const authorizationRouter: Router = Router();

// authorize router
authorizationRouter.post('/', async (req, res) => {
    try {
        const payload = await authorization.authorizeTenant(req.body);
        res.send(payload);
    } catch (error) {
        res.send(error);
    }
});

export default authorizationRouter;
