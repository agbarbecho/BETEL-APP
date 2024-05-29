import { Router } from "express";
import {
  getAllPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patients.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { isAuth, isAdminOrVeterinarian } from "../middlewares/auth.middleware.js";
import { createPatientSchema, updatePatientSchema } from "../schemas/patient.schema.js";

const router = Router();

router.get("/patients", isAuth, isAdminOrVeterinarian, getAllPatients);

router.get("/patients/:patientId", isAuth, isAdminOrVeterinarian, getPatient);

router.post("/patients", isAuth, isAdminOrVeterinarian, validateSchema(createPatientSchema), createPatient);

router.put("/patients/:patientId", isAuth, isAdminOrVeterinarian, validateSchema(updatePatientSchema), updatePatient);

router.delete("/patients/:patientId", isAuth, isAdminOrVeterinarian, deletePatient);

export default router;
