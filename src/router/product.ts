import { Router } from 'express';
import { product } from '../controller';

const productRouter: Router = Router();

// productRouter.post('/', product.createProduct);
productRouter.get('/', product.getProducts);
// productRouter.put('/', product.updateProduct);
productRouter.delete('/', product.deleteProduct);

export default productRouter;
