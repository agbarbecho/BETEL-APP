import { z } from 'zod';

export const createHospitalizationSchema = z.object({
  patient_id: z.number(),
  admission_date: z.string(),
  estimated_days: z.number(),
  patient_type: z.string(),
  hospitalization_type: z.string(),
  prognosis: z.string(),
  belongings: z.string().optional(),
  observations: z.string().optional(),
  diet: z.string().optional(),
  charge_service: z.boolean(),
  is_hospitalized: z.boolean()
});

export const updateHospitalizationSchema = z.object({
  patient_id: z.number().optional(),
  admission_date: z.string().optional(),
  estimated_days: z.number().optional(),
  patient_type: z.string().optional(),
  hospitalization_type: z.string().optional(),
  prognosis: z.string().optional(),
  belongings: z.string().optional(),
  observations: z.string().optional(),
  diet: z.string().optional(),
  charge_service: z.boolean().optional(),
  is_hospitalized: z.boolean().optional()
});
