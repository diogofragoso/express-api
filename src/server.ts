import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import Logger from './config/logger';
import bcrypt from 'bcrypt';

import { prisma } from './lib/prisma'; // Importa a instância do Prisma para garantir que a conexão seja estabelecida / Teste do primeiro Insert

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares de Segurança ---
app.use(helmet()); // Protege cabeçalhos HTTP
app.use(cors());   // Habilita CORS para o frontend
app.use(express.json()); // Permite JSON no body

// --- Middleware de Logs (Morgan + Winston) ---
// Redireciona os logs do Morgan para o nosso Winston
const stream = {
  write: (message: string) => Logger.http(message.trim()),
};

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream }));

// --- Rota de Teste ---
app.get('/health', (req, res) => {
  Logger.info('Alguém verificou o status da API!');
  res.status(200).json({ status: 'OK', message: 'API  rodando perfeitamente.' });
});

// Vamos criar as rotas de transações aqui mesmo, para manter tudo simples e direto
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // O Prisma já sabe que 'user' existe por causa do migrate!
    const hashedPassword = await bcrypt.hash(password, 10); // Hash da senha para segurança
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Armazenamos a senha sem hash para fins de teste, mas em produção, use o hashedPassword
      },
    });

    Logger.info(`Usuário criado com segurança: ${newUser.email}`);
    const { password: _, ...userWithoutPassword } = newUser; // Remove a senha do objeto de resposta
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    Logger.error('Erro ao criar usuário:', error);
    res.status(400).json({ error: 'Erro ao criar usuário. O e-mail pode já existir.' });
  }
});

// Fim da primeira para inserção de usuário

// Rota para exibir os usuários 
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    Logger.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});

//







// --- Inicialização ---
app.listen(PORT, () => {
  Logger.info(`🚀 Servidor rodando na porta ${PORT}`);
});