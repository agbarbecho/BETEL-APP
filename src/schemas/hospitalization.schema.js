import { z } from 'zod';

export const createHospitalizationSchema = z.object({
  patient_id: z.number().int(),
  client_id: z.number().int(),
  admission_date: z.string(),
  estimated_days: z.number().int(),
  patient_type: z.string(),
  hospitalization_type: z.string(),
  prognosis: z.string().optional(),
  belongings: z.string().optional(),
  observations: z.string().optional(),
  diet: z.string().optional(),
  charge_service: z.boolean().optional(),
  is_hospitalized: z.boolean().optional()
});

export const updateHospitalizationSchema = z.object({
  patient_id: z.number().int(),
  client_id: z.number().int(), // Añadir client_id
  admission_date: z.string(),
  estimated_days: z.number().int(),
  patient_type: z.string(),
  hospitalization_type: z.string(),
  prognosis: z.string().optional(),
  belongings: z.string().optional(),
  observations: z.string().optional(),
  diet: z.string().optional(),
  charge_service: z.boolean().optional(),
  is_hospitalized: z.boolean().optional()
});
