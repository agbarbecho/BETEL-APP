import Router from 'express-promise-router';
import {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clients.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/clients", isAuth, getAllClients);
router.get("/clients/:id", isAuth,  getClient);
router.post("/clients", isAuth, createClient);
router.put("/clients/:id", isAuth,  updateClient);
router.delete("/clients/:id", isAuth,  deleteClient);

export default router;
