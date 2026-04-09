import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Logger from '../config/logger';

// Criamos uma interface para o TypeScript saber que o Request agora pode ter um userId
export interface AuthRequest extends Request {
  userId?: number;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  // O token geralmente vem no cabeçalho (Header) assim: "Bearer tokenhdjsakhdj..."
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  // Separa o "Bearer" do token em si
  const [, token] = authHeader.split(' ');

  try {
    // Tenta decodificar o token usando a nossa chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
    
    // Anota o ID do usuário na requisição para que o Controller possa usar depois!
    req.userId = decoded.id; 
    
    return next(); // Tudo certo, pode passar!
  } catch (error) {
    Logger.error('Token inválido ou expirado.');
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};