import { Router } from 'express';
import { homeController } from '../controller';
import { ROUTES } from '../routes';

const homeRouter: Router = Router();

homeRouter.get(ROUTES.HOME, homeController);

export default homeRouter;
