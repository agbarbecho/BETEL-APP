import { z } from "zod";

// Esquema para la creación de pacientes
export const createPatientSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(1)
    .max(255),
  breed: z
    .string({
      required_error: "La raza es requerida",
      invalid_type_error: "La raza debe ser un texto",
    })
    .min(1)
    .max(255),
  species: z
    .string({
      required_error: "La especie es requerida",
      invalid_type_error: "La especie debe ser un texto",
    })
    .min(1)
    .max(255),
  weight: z
    .number({
      required_error: "El peso es requerido",
      invalid_type_error: "El peso debe ser un número",
    })
    .min(0)
    .max(999.99),
});

// Esquema para la actualización de pacientes
export const updatePatientSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(1)
    .max(255),
  breed: z
    .string({
      required_error: "La raza es requerida",
      invalid_type_error: "La raza debe ser un texto",
    })
    .min(1)
    .max(255),
  species: z
    .string({
      required_error: "La especie es requerida",
      invalid_type_error: "La especie debe ser un texto",
    })
    .min(1)
    .max(255),
  weight: z
    .number({
      required_error: "El peso es requerido",
      invalid_type_error: "El peso debe ser un número",
    })
    .min(0)
    .max(999.99),
});
