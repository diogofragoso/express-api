import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

export const login = async (email: string, password: string) => {
  // 1. Procura o usuário pelo e-mail
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Credenciais inválidas.'); // E-mail não existe

  // 2. Compara a senha digitada com o hash do banco
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Credenciais inválidas.'); // Senha errada

  // 3. Gera o Token JWT (válido por 1 dia)
  const token = jwt.sign(
    { id: user.id, email: user.email }, // Dados que vão dentro do crachá (Payload)
    process.env.JWT_SECRET as string,   // Nossa chave secreta
    { expiresIn: '1d' }
  );

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};