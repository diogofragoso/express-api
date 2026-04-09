import { Router } from 'express';
import { create, list, getUserId, update, remove } from '../controllers/user.controller';

const router = Router();

router.post('/', create);
router.get('/', list);
router.get('/:id', getUserId);
router.put('/:id', update);
router.delete('/:id', remove);


export default router;