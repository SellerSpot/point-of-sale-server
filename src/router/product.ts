import { Router } from 'express';
import { productController } from '../controller';

const productRouter: Router = Router();

// productRouter.post('/', productController.createProduct);
// productRouter.get('/', productController.getProducts);
// productRouter.get('/:productid', productController.getSingleProduct);
// // productRouter.put('/', productController.updateProduct);
// productRouter.delete('/', productController.deleteProduct);

export default productRouter;
