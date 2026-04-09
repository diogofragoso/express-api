import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import Logger from './config/logger';
import routes from './routes'; // Importa as rotas centralizadas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares de Segurança ---
app.use(helmet());
app.use(cors());
app.use(express.json());

// --- Middleware de Logs (Morgan + Winston) ---
const stream = {
  write: (message: string) => Logger.http(message.trim()),
};
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream }));

// --- Rotas ---
app.use(routes);

// --- Inicialização ---
app.listen(PORT, () => {
  Logger.info(`🚀 Servidor a correr na porta ${PORT}`);
});