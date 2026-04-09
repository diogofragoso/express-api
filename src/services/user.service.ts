import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';

export const createUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,      
    },
  });
};
export const updateUser = async (id: number, data: { name?: string; email?: string }) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data, // Passamos o objeto data diretamente
  });

  // Removemos a senha antes de devolver
  const { password: _, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};