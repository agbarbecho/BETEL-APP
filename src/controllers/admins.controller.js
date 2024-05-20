import { pool } from "../db.js";

export const getAllUsers = async (req, res, next) => {
  try {
    if (req.user.role_id !== 1) {
      return res.status(403).json({ message: 'Acceso denegado. No eres un administrador.' });
    }

    const result = await pool.query("SELECT id, name, email, role_id FROM users");

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
