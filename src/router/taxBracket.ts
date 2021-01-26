import { Router } from 'express';
import { taxBracketController } from '../controller/controller';

const taxBracketRouter: Router = Router();

// taxBracketRouter.post('/', taxBracketController.createTaxBracket);
// taxBracketRouter.get('/', taxBracketController.getTaxBrackets);
// // taxBracketRouter.put('/', taxBracketController.updateTaxBracket);
// taxBracketRouter.delete('/:taxBracketid', taxBracketController.deleteTaxBracket);

export default taxBracketRouter;
