import { Router } from "express";
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patients.controller.js";
import { isAuth, isVeterinarian } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/patients", isAuth, isVeterinarian, getAllPatients);
router.get("/patients/:patientId", isAuth, isVeterinarian, getPatientById);
router.post("/patients", isAuth, isVeterinarian, createPatient);
router.put("/patients/:patientId", isAuth, isVeterinarian, updatePatient);
router.delete("/patients/:patientId", isAuth, deletePatient);

export default router;
