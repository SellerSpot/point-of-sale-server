import { Router } from 'express';
import { sale } from '../controller';

const saleRouter: Router = Router();

saleRouter.post('/', sale.createSale);
saleRouter.get('/', sale.getSales);
saleRouter.get('/:saleid', sale.getSingleSale);
saleRouter.delete('/:saleid', sale.deleteSale);

export default saleRouter;
