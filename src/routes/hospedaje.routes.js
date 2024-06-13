import { Router } from "express";
import {
  getAllHospedajes,
  getHospedaje,
  createHospedaje,
  updateHospedaje,
  deleteHospedaje,
} from "../controllers/hospedaje.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { isAuth, isAdminOrVeterinarian } from "../middlewares/auth.middleware.js";
import { createHospedajeSchema, updateHospedajeSchema } from "../schemas/hospedaje.schema.js";

const router = Router();

router.get("/hospedaje", isAuth, isAdminOrVeterinarian, getAllHospedajes);

router.get("/hospedaje/:hospedajeId", isAuth, isAdminOrVeterinarian, getHospedaje);

router.post("/hospedaje", isAuth, isAdminOrVeterinarian, validateSchema(createHospedajeSchema), createHospedaje);

router.put("/hospedaje/:hospedajeId", isAuth, isAdminOrVeterinarian, validateSchema(updateHospedajeSchema), updateHospedaje);

router.delete("/hospedaje/:hospedajeId", isAuth, isAdminOrVeterinarian, deleteHospedaje);

export default router;
