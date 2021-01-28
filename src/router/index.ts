import { Router } from 'express';
import brandRouter from './brand';
import categoryRouter from './category';
import homeRouter from './home';
import productRouter from './product';
import saleRouter from './sale';
import stockUnitRouter from './stockUnit';
import taxBracketRouter from './taxBracket';
import authorizationRouter from './authorization';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

const rootRouter: Router = Router();

rootRouter.use(pointOfSaleTypes.ROUTES.AUTHORIZE, authorizationRouter);
rootRouter.use(pointOfSaleTypes.ROUTES.CATEGORY, categoryRouter);
rootRouter.use(pointOfSaleTypes.ROUTES.BRAND, brandRouter);
rootRouter.use(pointOfSaleTypes.ROUTES.STOCK_UNIT, stockUnitRouter);
rootRouter.use(pointOfSaleTypes.ROUTES.TAX_BRACKET, taxBracketRouter);
rootRouter.use(pointOfSaleTypes.ROUTES.PROUDCT, productRouter);
rootRouter.use(pointOfSaleTypes.ROUTES.SALE, saleRouter);
rootRouter.use(homeRouter);

export default rootRouter;
