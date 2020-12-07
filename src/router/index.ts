import { Router } from 'express';
import brandRouter from './brand';
import categoryRouter from './category';
import homeRouter from './home';
import productRouter from './product';
import stockUnitRouter from './stockUnit';
import taxBracketRouter from './taxBracket';

const rootRouter: Router = Router();

rootRouter.use('/category', categoryRouter);
rootRouter.use('/brand', brandRouter);
rootRouter.use('/stockunit', stockUnitRouter);
rootRouter.use('/taxbracket', taxBracketRouter);
rootRouter.use('/product', productRouter);
rootRouter.use('/', homeRouter);

export default rootRouter;
