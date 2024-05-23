// src/routes/admin.routes.js
import { Router } from "express";
import { getAllUsers, deleteUser, assignRole } from "../controllers/admins.controller.js";
import { isAuth, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/users", isAuth, isAdmin, getAllUsers);

router.put("/users/roles", isAuth, isAdmin, assignRole);

router.delete("/users/:userId", isAuth, isAdmin, deleteUser);

export default router;
