import { Router } from 'express';
import { stockUnit } from '../controller';

const stockUnitRouter: Router = Router();

stockUnitRouter.post('/', stockUnit.createStockUnit);
stockUnitRouter.get('/', stockUnit.getStockUnits);
stockUnitRouter.put('/', stockUnit.updateStockUnit);
stockUnitRouter.delete('/', stockUnit.deleteStockUnit);

export default stockUnitRouter;
