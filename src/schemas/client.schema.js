import { z } from "zod";

export const createClientSchema = z.object({
  cedula: z
    .string({
      required_error: "La cedula debe ser obligatoria",
      invalid_type_error: "La cedula debe ser un numero",
    })
    .min(1)
    .max(10),
  full_name: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(1)
    .max(255),
  phone: z
    .string({
      required_error: "El numero de telefono es requerido",
      invalid_type_error: "El numero de telefono debe ser un numero",
    })
    .min(1)
    .max(10),
  address: z
    .string({
      required_error: "La dirección es requerida",
      invalid_type_error: "La dirección debe ser texto",
    })
    .min(1)
    .max(255),
    email: z
    .string({
      required_error: "El peso es requerido",
      invalid_type_error: "El email debe ser un texto",
    })
    .min(1)
    .max(255),
});


// Esquema para la actualización de pacientes
export const updateClientSchema = z.object({
  cedula: z
  .string({
    required_error: "La cedula debe ser obligatoria",
    invalid_type_error: "La cedula debe ser un numero",
  })
  .min(1)
  .max(255),
full_name: z
  .string({
    required_error: "El nombre es requerido",
    invalid_type_error: "El nombre debe ser un texto",
  })
  .min(1)
  .max(255),
phone: z
  .string({
    required_error: "El numero de telefono es requerido",
    invalid_type_error: "el numero de telefono debe ser un numero",
  })
  .min(1)
  .max(255),
address: z
  .string({
    required_error: "la dirección es requerida",
    invalid_type_error: "la dirección debe ser texto",
  })
  .min(0)
  .max(999.99),
  email: z
  .string({
    required_error: "El peso es requerido",
    invalid_type_error: "El email debe ser un texto",
  })
  .min(0)
  .max(999.99),
});