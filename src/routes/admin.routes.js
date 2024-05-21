import { Router } from "express";
<<<<<<< Updated upstream
import { getAllUsers, updateUserRole, deleteUser } from "../controllers/admins.controller.js";
=======
import { getAllUsers, assignRole, updateUser, deleteUser } from "../controllers/admins.controller.js";
>>>>>>> Stashed changes
import { isAuth, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/users", isAuth, isAdmin, getAllUsers);
<<<<<<< Updated upstream
router.put("/users/role", isAuth, isAdmin, updateUserRole);
router.delete("/users", isAuth, isAdmin, deleteUser);
=======
router.put("/role", isAuth, isAdmin, assignRole);
router.put("/update-user", isAuth, isAdmin, updateUser);
router.delete("/delete-user/:userId", isAuth, isAdmin, deleteUser);
>>>>>>> Stashed changes

export default router;
