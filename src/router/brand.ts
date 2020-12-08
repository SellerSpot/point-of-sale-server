import { Router } from 'express';
import { brand } from '../controller';

const brandRouter: Router = Router();

brandRouter.post('/', brand.createBrand);
brandRouter.get('/', brand.getBrands);
// brandRouter.put('/', brand.updateBrand);
brandRouter.delete('/', brand.deleteBrand);

export default brandRouter;
