import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import Logger from '../config/logger';

export const create = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await userService.createUser(name, email, password);
    Logger.info(`Utilizador criado com segurança: ${user.email}`);
    res.status(201).json(user);
  } catch (error) {
    Logger.error('Erro ao criar utilizador:', error);
    res.status(400).json({ error: 'Erro ao criar utilizador. O e-mail pode já existir.' });
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    Logger.error('Erro ao procurar utilizadores:', error);
    res.status(500).json({ error: 'Erro ao procurar utilizadores.' });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    // Agora passamos como um objeto, igual ao que ajustamos no Service
    const user = await userService.updateUser(Number(id), { name, email });
    res.status(200).json(user);
  } catch (error: any) {
    Logger.error('Erro ao atualizar utilizador:', error);
    // Aqui está o truque: devolver o erro real para o cliente durante o desenvolvimento
    res.status(400).json({ 
        error: 'Erro ao atualizar utilizador.', 
        details: error.message 
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await userService.deleteUser(Number(id));
    res.status(200).json({ message: 'Utilizador removido com sucesso.' });
  } catch (error) {
    Logger.error('Erro ao remover utilizador:', error);
    res.status(400).json({ error: 'Erro ao remover utilizador.' });
  }
};

export const getUserId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(Number(id));
    res.status(200).json(user);
  } catch (error) {
    Logger.error('Erro ao procurar utilizador:', error);
    res.status(400).json({ error: 'Erro ao procurar utilizador.' });
  }
};