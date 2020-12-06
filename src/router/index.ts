import { Router } from 'express';
import brandRouter from './brand';
import categoryRouter from './category';
import homeRouter from './home';

const rootRouter: Router = Router();

rootRouter.use('/category', categoryRouter);
rootRouter.use('/brand', brandRouter);
rootRouter.use('/', homeRouter);

export default rootRouter;
