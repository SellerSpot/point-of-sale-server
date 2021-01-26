import { brandController } from 'controller';
import { Router } from 'express';

const brandRouter: Router = Router();

// get all brands
brandRouter.get('/', async (_, res) => res.send(await brandController.getBrands()));
// get single brand
brandRouter.get('/:id', async (req, res) =>
    res.send(await brandController.getSingleBrand({ id: req.params['id'] })),
);
// to create a new brand
brandRouter.post('/', async (req, res) => res.send(await brandController.createBrand(req.body)));
// to update an existing brand
brandRouter.put('/', async (req, res) => res.send(await brandController.updateBrand(req.body)));
// to delete an existing brand
brandRouter.delete('/:id', async (req, res) =>
    res.send(await brandController.deleteBrand({ id: req.params['id'] })),
);

export default brandRouter;
