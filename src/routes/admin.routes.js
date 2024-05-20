import { Router } from "express";
import { getAllUsers } from "../controllers/admins.controller.js";
import { isAuth, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/users", isAuth, isAdmin, getAllUsers);

export default router;
