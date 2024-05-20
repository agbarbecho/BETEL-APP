import { Router } from "express";
import {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatient,
  updatePatient,
} from "../controllers/patients.controller.js";
import { isAuth} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/patients", isAuth,  getAllPatients);
router.get("/patients/:id", isAuth,  getPatient);
router.post("/patients", isAuth,  createPatient);
router.put("/patients/:id", isAuth,  updatePatient);
router.delete("/patients/:id", isAuth,  deletePatient);

export default router;
