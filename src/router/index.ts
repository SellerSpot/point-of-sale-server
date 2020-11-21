import { Router } from 'express';
import homeRouter from './home';

const rootRouter: Router = Router();

rootRouter.use('/', homeRouter);

export default rootRouter;
