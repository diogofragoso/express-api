import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import Logger from '../config/logger';

// Esta função recebe um schema do Zod e retorna um middleware do Express
export const validate = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Tenta validar o body, query e params da requisição contra o schema
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      return next(); // Se estiver tudo certo, passa a bola para o Controller!
    } catch (error: any) {
      Logger.warn('Tentativa de envio de dados inválidos barrada pelo Zod.');
      // O Zod devolve um array de erros detalhado, vamos mandar isso para o cliente
      return res.status(400).json({ 
        error: 'Dados de entrada inválidos.', 
        details: error.errors 
      });
    }
  };