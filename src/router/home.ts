import { Router } from 'express';
import { homeController } from '../controller';

const homeRouter: Router = Router();

homeRouter.get('/', homeController.homeController);

export default homeRouter;
