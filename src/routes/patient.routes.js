import { Router } from "express";
import {
  getAllPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patients.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { isAuth, isVeterinarian } from "../middlewares/auth.middleware.js";
import {  createPatientSchema , updatePatientSchema } from "../schemas/patient.schema.js";


const router = Router();

router.get("/patients", isAuth, isVeterinarian,getAllPatients);

router.get("/patients/id", isAuth, isVeterinarian, getPatient);

router.post("/patients", isAuth, isVeterinarian, validateSchema(createPatientSchema), createPatient);

router.put("/patients/:id", isAuth, isVeterinarian, validateSchema(updatePatientSchema), updatePatient);

router.delete("/patients/:id", isAuth, deletePatient);

export default router;
