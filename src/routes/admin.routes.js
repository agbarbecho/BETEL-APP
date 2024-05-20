import { Router } from "express";
import { getAllUsers, updateUserRole, deleteUser } from "../controllers/admins.controller.js";
import { isAuth, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/users", isAuth, isAdmin, getAllUsers);
router.put("/users/role", isAuth, isAdmin, updateUserRole);
router.delete("/users", isAuth, isAdmin, deleteUser);

export default router;
