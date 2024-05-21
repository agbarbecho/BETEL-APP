import { Router } from "express";
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clients.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { isAuth, isVeterinarian } from "../middlewares/auth.middleware.js";
import { createClientSchema, updateClientSchema } from "../schemas/client.schema.js";

const router = Router();

router.get("/clients", isAuth, isVeterinarian, getAllClients);

router.get("/clients/:id", isAuth, isVeterinarian, getClientById);

router.post("/clients", isAuth, isVeterinarian, validateSchema(createClientSchema), createClient);

router.put("/clients/:id", isAuth, isVeterinarian,validateSchema(updateClientSchema), updateClient);

router.delete("/delete/:id", isAuth, isVeterinarian, deleteClient);

export default router;
