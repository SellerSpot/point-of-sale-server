import { Router } from 'express';
import { homeController } from '../controller/controller';

const homeRouter: Router = Router();

homeRouter.get('/', homeController.homeController);

export default homeRouter;
