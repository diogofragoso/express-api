//arquivo que vai conter todas as rotas
import { Router } from 'express';
import userRoutes from './user.routes';
import Logger from '../config/logger';

const router = Router();

// Rota de Health Check
router.get('/health', (req, res) => {
  Logger.info('Alguém verificou o estado da API!');
  res.status(200).json({ status: 'OK', message: 'API a correr perfeitamente.' });
});

// Todas as rotas de utilizadores vão começar com /users
router.use('/users', userRoutes);

export default router;