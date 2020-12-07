import { Router } from 'express';
import brandRouter from './brand';
import categoryRouter from './category';
import homeRouter from './home';
import stockUnitRouter from './stockUnit';

const rootRouter: Router = Router();

rootRouter.use('/category', categoryRouter);
rootRouter.use('/brand', brandRouter);
rootRouter.use('/stockunit', stockUnitRouter);
rootRouter.use('/', homeRouter);

export default rootRouter;
