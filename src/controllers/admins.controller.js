import { pool } from "../db.js";

// Obtener todos los usuarios
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

=======
// Asignar un rol a un usuario
export const assignRole = async (req, res, next) => {

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

    const { userId, roleId } = req.body;

    await pool.query("UPDATE users SET role_id = $1 WHERE id = $2", [roleId, userId]);

    res.json({ message: 'Rol asignado exitosamente.' });
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

    const { userId, name, email } = req.body;

    await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3",
      [name, email, userId]
    );

    res.json({ message: 'Usuario actualizado exitosamente.' });

  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { userId } = req.body;

// Eliminar un usuario
export const deleteUser = async (req, res, next) => {

  try {
    if (req.user.role_id !== 1) {
      return res.status(403).json({ message: 'Acceso denegado. No eres un administrador.' });
    }


    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id, name, email, role_id", [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json({ message: 'Usuario eliminado correctamente.' });

    const { userId } = req.params;

    await pool.query("DELETE FROM users WHERE id = $1", [userId]);

    res.json({ message: 'Usuario eliminado exitosamente.' });

  } catch (error) {
    next(error);
  }
};
