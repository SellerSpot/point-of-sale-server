import { Router } from 'express';
import { sale } from '../controller';

const saleRouter: Router = Router();

saleRouter.get('/', sale.getSales);
saleRouter.get('/:saleid', sale.getSales);
saleRouter.delete('/', sale.deleteSale);

export default saleRouter;
