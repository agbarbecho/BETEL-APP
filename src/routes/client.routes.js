import { Router } from "express";
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clients.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { isAuth, isAdminOrVeterinarian } from "../middlewares/auth.middleware.js";
import { createClientSchema, updateClientSchema } from "../schemas/client.schema.js";

const router = Router();

router.get("/clients", isAuth, isAdminOrVeterinarian, getAllClients);

router.get("/clients/:id", isAuth, isAdminOrVeterinarian, getClientById);

router.post("/clients", isAuth, isAdminOrVeterinarian, validateSchema(createClientSchema), createClient);

router.put("/clients/:id", isAuth, isAdminOrVeterinarian, validateSchema(updateClientSchema), updateClient);

router.delete("/clients/:id", isAuth, isAdminOrVeterinarian, deleteClient);

export default router;
