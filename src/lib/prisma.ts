import { PrismaClient } from '@prisma/client';

// Isso garante que não criemos múltiplas conexões com o banco em desenvolvimento
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Loga as queries para facilitar o desenvolvimento
  });


/*
Em desenvolvimento → guarda a instância no global
Em produção → NÃO faz isso
Por quê?
Em produção, o servidor roda de forma mais estável (sem reload constante)
Evita comportamentos inesperados devido aos reloads
*/

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


// Resumo deste aquivo:
//  Cria uma conexão com o banco usando Prisma
// Evita criar múltiplas conexões em desenvolvimento
// Reutiliza a mesma instância sempre
// Mostra as queries SQL no console