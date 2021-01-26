import { Router } from 'express';
import { categoryController } from '../controller';

const categoryRouter: Router = Router();

// categoryRouter.post('/', categoryController.createCategory);
// categoryRouter.get('/', categoryController.getCategories);
// // categoryRouter.put('/', categoryController.updateCategory);
// categoryRouter.delete('/:categoryid', categoryController.deleteCategory);

export default categoryRouter;
