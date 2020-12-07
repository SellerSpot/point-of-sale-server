import { Router } from 'express';
import { sale } from '../controller';

const saleRouter: Router = Router();

// saleRouter.post('/', sale.createsale);
saleRouter.get('/', sale.getSales);
// saleRouter.put('/', sale.updatesale);
saleRouter.delete('/', sale.deleteSale);

export default saleRouter;
