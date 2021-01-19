import { Router } from 'express';
import { home } from '../controller';

const homeRouter: Router = Router();

homeRouter.get('/', home.homeController);

export default homeRouter;
