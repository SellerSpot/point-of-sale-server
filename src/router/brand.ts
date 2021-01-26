import { brandController } from 'controller';
import { Router } from 'express';

const brandRouter: Router = Router();

// brandRouter.post('/', brand.createBrand);
brandRouter.get('/', async (req, res) => {
    const getBrandsData = await brandController.getBrands();
    res.send(getBrandsData);
});
brandRouter.get('/:id', async (req, res) => {
    const getBrandData = await brandController.getSingleBrand(req.params['id']);
    res.send(getBrandData);
});
// brandRouter.put('/', brand.updateBrand);
// brandRouter.delete('/:brandid', brand.deleteBrand);

export default brandRouter;
