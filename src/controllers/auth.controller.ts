import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import Logger from '../config/logger';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authService.login(email, password);
    Logger.info(`Login efetuado com sucesso: ${email}`);
    res.status(200).json(result);
  } catch (error: any) {
    Logger.warn(`Falha de login para o e-mail: ${email}`);
    // Sempre devolvemos 401 (Unauthorized) para falhas de login
    res.status(401).json({ error: error.message });
  }
};