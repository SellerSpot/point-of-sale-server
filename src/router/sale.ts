import { Router } from 'express';
import { saleController } from '../controller';

const saleRouter: Router = Router();

// saleRouter.post('/', saleController.createSale);
// saleRouter.get('/', saleController.getSales);
// saleRouter.get('/:saleid', saleController.getSingleSale);
// saleRouter.delete('/:saleid', saleController.deleteSale);

export default saleRouter;
