import { z } from "zod";

export const createHospitalizationSchema = z.object({
  patient_id: z.number().int(),
  admission_date: z.string().min(1),
  estimated_days: z.number().int().nullable(),
  patient_type: z.string().max(50),
  hospitalization_type: z.string().max(50),
  prognosis: z.string().nullable(),
  belongings: z.string().nullable(),
  observations: z.string().nullable(),
  diet: z.string().nullable(),
  charge_service: z.boolean(),
});

export const updateHospitalizationSchema = z.object({
  patient_id: z.number().int(),
  admission_date: z.string().min(1),
  estimated_days: z.number().int().nullable(),
  patient_type: z.string().max(50),
  hospitalization_type: z.string().max(50),
  prognosis: z.string().nullable(),
  belongings: z.string().nullable(),
  observations: z.string().nullable(),
  diet: z.string().nullable(),
  charge_service: z.boolean(),
});
