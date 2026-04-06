import winston from 'winston';

// Define níveis de log e cores
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// Formatação customizada
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Onde os logs serão salvos
const transports = [
  // Log de erros no console
  new winston.transports.Console(),
  // Salvar todos os erros em um arquivo separado
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  // Salvar todos os logs em um arquivo geral
  new winston.transports.File({ filename: 'logs/all.log' }),
];

const Logger = winston.createLogger({
  level: 'debug', // Captura de debug para cima
  levels,
  format,
  transports,
});

export default Logger;