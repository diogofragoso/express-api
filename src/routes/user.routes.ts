import { Router } from 'express';
import { create, list, getUserId, update, remove } from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema';
import { authenticate } from '../middlewares/auth.middleware'; // <-- IMPORTANTE


const router = Router();

// Forma 1

/*
router.post('/', create);
router.get('/', list);
router.get('/:id', getUserId);
router.put('/:id', update);
router.delete('/:id', remove);
*/



// Forma 2
/*

// Adicionamos o validate(schema) antes de chamar o Controller
router.post('/', validate(createUserSchema), create);
router.get('/', list);
router.get('/:id', getUserId);
router.put('/:id', validate(updateUserSchema), update);
router.delete('/:id', remove);
*/



// Forma 3
// Criar usuário continua livre (qualquer um pode se cadastrar)
router.post('/', validate(createUserSchema), create);

// Mas listar, buscar um específico, atualizar e deletar, agora exigem o Token!
router.get('/', authenticate, list);
router.get('/:id', authenticate, getUserId);
router.put('/:id', authenticate, validate(updateUserSchema), update);
router.delete('/:id', authenticate, remove);

export default router;




