import { pool } from "../db.js";

export const getAllClients = async (req, res, next) => {
  if (req.role !== 'VETERINARIO') {
    return res.status(403).json({ message: "No autorizado" });
  }

  const result = await pool.query("SELECT * FROM clients WHERE user_id = $1", [
    req.userId,
  ]);
  return res.json(result.rows);
};

export const getClient = async (req, res) => {
  if (req.role !== 'VETERINARIO') {
    return res.status(403).json({ message: "No autorizado" });
  }

  const result = await pool.query("SELECT * FROM clients WHERE id = $1", [
    req.params.id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un cliente con ese id",
    });
  }

  return res.json(result.rows[0]);
};

export const createClient = async (req, res, next) => {
  if (req.role !== 'VETERINARIO') {
    return res.status(403).json({ message: "No autorizado" });
  }

  const { cedula, full_name, phone, address, email } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO clients(cedula, full_name, phone, address, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [cedula, full_name, phone, address, email]
    );

    res.json(result.rows[0]);   
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Ya existe este cliente",
      });
    }
    next(error);
  }
};
export const updateClient = async (req, res) => {
  if (req.role !== 'VETERINARIO') {
    return res.status(403).json({ message: "No autorizado" });
  }

  const { id } = req.params;
  const { cedula, full_name, phone, address, email } = req.body;

  const result = await pool.query(
    "UPDATE clients SET cedula = $1, full_name = $2, phone = $3, address = $4, email = $5 WHERE id = $6 RETURNING *",
    [cedula, full_name, phone, address, email, id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un cliente con ese id",
    });
  }

  return res.json(result.rows[0]);
};



export const deleteClient = async (req, res) => {
  if (req.role !== 'VETERINARIO') {
    return res.status(403).json({ message: "No autorizado" });
  }

  const result = await pool.query("DELETE FROM clients WHERE id = $1", [
    req.params.id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un cliente con ese id",
    });
  }
  return res.sendStatus(204);
};