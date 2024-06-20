import { Router } from "express";
import {
  getAllHospitalizations,
  getAllHospitalizationsIncludingInactive,
  getHospitalization,
  createHospitalization,
  updateHospitalization,
  updateHospitalizationStatus,
  deleteHospitalization,
} from "../controllers/hospitalizations.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { isAuth, isAdminOrVeterinarian } from "../middlewares/auth.middleware.js";
import { createHospitalizationSchema, updateHospitalizationSchema } from "../schemas/hospitalization.schema.js";

const router = Router();

router.get("/hospitalization", isAuth, isAdminOrVeterinarian, getAllHospitalizations);
router.get("/hospitalization/inactive", isAuth, isAdminOrVeterinarian, getAllHospitalizationsIncludingInactive);
router.get("/hospitalization/:hospitalizationId", isAuth, isAdminOrVeterinarian, getHospitalization);
router.post("/hospitalization", isAuth, isAdminOrVeterinarian, validateSchema(createHospitalizationSchema), createHospitalization);
router.put("/hospitalization/:hospitalizationId", isAuth, isAdminOrVeterinarian, validateSchema(updateHospitalizationSchema), updateHospitalization);
router.patch("/hospitalization/:hospitalizationId/status", isAuth, isAdminOrVeterinarian, updateHospitalizationStatus);
router.delete("/hospitalization/:hospitalizationId", isAuth, isAdminOrVeterinarian, deleteHospitalization);

export default router;
