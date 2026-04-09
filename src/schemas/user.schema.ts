import { z } from 'zod';

// Molde para a criação de usuário
export const createUserSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'O nome é obrigatório.' })
      .min(3, 'O nome deve ter no mínimo 3 caracteres.'),
    email: z.string({ required_error: 'O e-mail é obrigatório.' })
      .email('Formato de e-mail inválido.'),
    password: z.string({ required_error: 'A senha é obrigatória.' })
      .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  }),
});

// Molde para atualização (tudo é opcional, mas se for enviado, tem que ser válido)
export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres.').optional(),
    email: z.string().email('Formato de e-mail inválido.').optional(),
  }),
});