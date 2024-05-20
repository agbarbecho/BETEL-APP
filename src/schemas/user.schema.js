import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string({
    required_error: 'El nombre es requerido',
    invalid_type_error: 'El nombre debe ser un texto'
  }).min(1).max(255),
  email: z.string({
    required_error: 'El email es requerido',
    invalid_type_error: 'El email debe ser un texto'
  }).email({
    message: 'El email debe ser un email válido'
  })
});
