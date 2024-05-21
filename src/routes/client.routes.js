import { Router } from "express";
import { getAllClients, getClientById, createClient, updateClient, deleteClient } from "../controllers/clients.controller.js";
import { isAuth, isVeterinarian } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/clients", isAuth, isVeterinarian, getAllClients);
router.get("/clients/:id", isAuth, isVeterinarian, getClientById);
router.post("/clients", isAuth, isVeterinarian, createClient); 
router.put("/update", isAuth, isVeterinarian, updateClient);
router.delete("/delete/:clientId", isAuth, isVeterinarian, deleteClient);

export default router;
