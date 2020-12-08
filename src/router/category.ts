import { Router } from 'express';
import { category } from '../controller';

const categoryRouter: Router = Router();

categoryRouter.post('/', category.createCategory);
categoryRouter.get('/', category.getCategories);
// categoryRouter.put('/', category.updateCategory);
categoryRouter.delete('/:categoryid', category.deleteCategory);

export default categoryRouter;
