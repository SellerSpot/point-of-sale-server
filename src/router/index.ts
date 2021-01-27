import { Router } from 'express';
import brandRouter from './brand';
import categoryRouter from './category';
import homeRouter from './home';
import productRouter from './product';
import saleRouter from './sale';
import stockUnitRouter from './stockUnit';
import taxBracketRouter from './taxBracket';
import authorizationRouter from './authorization';
import { MAJOR_ROUTES } from 'utilities/globalData';

const rootRouter: Router = Router();

rootRouter.use(MAJOR_ROUTES.AUTHORIZE, authorizationRouter);
rootRouter.use(MAJOR_ROUTES.CATEGORY, categoryRouter);
rootRouter.use(MAJOR_ROUTES.BRAND, brandRouter);
rootRouter.use(MAJOR_ROUTES.STOCK_UNIT, stockUnitRouter);
rootRouter.use(MAJOR_ROUTES.TAX_BRACKET, taxBracketRouter);
rootRouter.use(MAJOR_ROUTES.PROUDCT, productRouter);
rootRouter.use(MAJOR_ROUTES.SALE, saleRouter);
rootRouter.use(MAJOR_ROUTES.HOME, homeRouter);

export default rootRouter;
