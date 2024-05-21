import { pool } from "../db.js";

// Obtener todos los clientes
export const getAllClients = async (req, res, next) => {
  try {
    if (req.user.role_id !== 2) {
      return res.status(403).json({ message: 'Acceso denegado. No eres un veterinario.' });
    }

    const result = await pool.query("SELECT id, full_name, email, phone, cedula FROM clients");

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// Obtener un cliente específico
export const getClientById = async (req, res, next) => {
  try {
    if (req.user.role_id !== 2) {
      return res.status(403).json({ message: 'Acceso denegado. No eres un veterinario.' });
    }

    const { clientId } = req.params;
    const result = await pool.query("SELECT id, full_name, email, phone, cedula FROM clients WHERE id = $1", [clientId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo cliente
export const createClient = async (req, res, next) => {
  try {
    if (req.user.role_id !== 2) {
      return res.status(403).json({ message: 'Acceso denegado. No eres un veterinario.' });
    }

    const { cedula, full_name, email, phone} = req.body;

    const result = await pool.query(
      "INSERT INTO clients (cedula, full_name, email, phone) VALUES ($1, $2, $3, $4) RETURNING *",
      [cedula, full_name, email, phone]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Actualizar información de un cliente
export const updateClient = async (req, res, next) => {
  try {
    if (req.user.role_id !== 2) {
      return res.status(403).json({ message: 'Acceso denegado. No eres un veterinario.' });
    }

    const { clientId, full_name, email, phone, cedula } = req.body;

    await pool.query(
      "UPDATE clients SET full_name = $1, email = $2, phone = $3, cedula = $4 WHERE id = $5",
      [full_name, email, phone, cedula, clientId]
    );

    res.json({ message: 'Cliente actualizado exitosamente.' });
  } catch (error) {
    next(error);
  }
};

// Eliminar un cliente
export const deleteClient = async (req, res, next) => {
  try {
    if (req.user.role_id !== 2) {
      return res.status(403).json({ message: 'Acceso denegado. No eres un veterinario.' });
    }

    const { clientId } = req.params;

    await pool.query("DELETE FROM clients WHERE id = $1", [clientId]);

    res.json({ message: 'Cliente eliminado exitosamente.' });
  } catch (error) {
    next(error);
  }
};
