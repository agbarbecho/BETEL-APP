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

export const updateUserRole = async (req, res, next) => {
  const { userId, roleId } = req.body;

  try {
    if (req.user.role_id !== 1) {
      return res.status(403).json({ message: 'Acceso denegado. No eres un administrador.' });
    }

    const result = await pool.query(
      "UPDATE users SET role_id = $1 WHERE id = $2 RETURNING id, name, email, role_id",
      [roleId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { userId } = req.body;

  try {
    if (req.user.role_id !== 1) {
      return res.status(403).json({ message: 'Acceso denegado. No eres un administrador.' });
    }

    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id, name, email, role_id", [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    next(error);
  }
};
