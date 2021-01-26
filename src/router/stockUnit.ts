import { Router } from 'express';
import { stockUnitController } from '../controller/controller';

const stockUnitRouter: Router = Router();

// stockUnitRouter.post('/', stockUnitController.createStockUnit);
// stockUnitRouter.get('/', stockUnitController.getStockUnits);
// // stockUnitRouter.put('/', stockUnitController.updateStockUnit);
// stockUnitRouter.delete('/:stockunitid', stockUnitController.deleteStockUnit);

export default stockUnitRouter;
