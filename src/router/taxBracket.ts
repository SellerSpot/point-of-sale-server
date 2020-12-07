import { Router } from 'express';
import { taxBracket } from '../controller';

const taxBracketRouter: Router = Router();

taxBracketRouter.post('/', taxBracket.createTaxBracket);
taxBracketRouter.get('/', taxBracket.getTaxBrackets);
taxBracketRouter.put('/', taxBracket.updateTaxBracket);
taxBracketRouter.delete('/', taxBracket.deleteTaxBracket);

export default taxBracketRouter;
