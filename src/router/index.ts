import { Router } from 'express';
import categoryRouter from './category';
import homeRouter from './home';

const rootRouter: Router = Router();

rootRouter.use('/category', categoryRouter);
rootRouter.use('/', homeRouter);

export default rootRouter;
