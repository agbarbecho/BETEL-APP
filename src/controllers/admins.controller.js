import { pool } from "../db.js";

// Obtener todos los usuarios
export const getAllUsers = async (req, res, next) => {
  try {
    if (req.user.role_id !== 1) {
      return res.status(403).json({ message: 'Acceso denegado. No eres un administrador.' });
    }

    const result = await pool.query("SELECT id, name, lastname, email, role_id, created_at FROM users");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// Asignar un rol a un usuario
export const assignRole = async (req, res, next) => {
  try {
    if (req.user.role_id !== 1) {
      return res.status(403).json({ message: 'Acceso denegado. No eres un administrador.' });
    }

    const { userId, roleId } = req.body;

    if (typeof userId !== 'number' || typeof roleId !== 'number') {
      return res.status(400).json({ message: 'Datos inválidos.' });
    }

    const result = await pool.query(
      "UPDATE users SET role_id = $1 WHERE id = $2 RETURNING id, name, lastname, email, role_id",
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

// Actualizar información de un usuario
export const updateUser = async (req, res, next) => {
  try {
    if (req.user.role_id !== 1) {
      return res.status(403).json({ message: 'Acceso denegado. No eres un administrador.' });
    }

    const { userId, name, lastname, email } = req.body;

    const result = await pool.query(
      "UPDATE users SET name = $1, lastname = $2, email = $3 WHERE id = $4 RETURNING id, name, lastname, email, role_id",
      [name, lastname, email, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.role_id !== 1) {
      return res.status(403).json({ message: 'Acceso denegado. No eres un administrador.' });
    }

    const { userId } = req.params;

    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id, name, lastname, email, role_id", [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    next(error);
  }
};
