import { pool } from "../db.js";

export const getAllPatients = async (req, res, next) => {
  if (req.role !== 'VETERINARIO') {
    return res.status(403).json({ message: "No autorizado" });
  }

  const result = await pool.query("SELECT * FROM patients WHERE user_id = $1", [
    req.userId,
  ]);
  return res.json(result.rows);
};

export const getPatient = async (req, res) => {
  if (req.role !== 'VETERINARIO') {
    return res.status(403).json({ message: "No autorizado" });
  }

  const result = await pool.query("SELECT * FROM patients WHERE id = $1", [
    req.params.id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un paciente con ese id",
    });
  }

  return res.json(result.rows[0]);
};

export const createPatient = async (req, res, next) => {
  const { name, breed, species, weight } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO patients(name, breed, species, weight) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, breed, species, weight]
    );

    res.json(result.rows[0]);   
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Ya existe un paciente con ese id",
      });
    }
    next(error);
  }
};
export const updatePatient = async (req, res) => {
  if (req.role !== 'VETERINARIO') {
    return res.status(403).json({ message: "No autorizado" });
  }

  const id = req.params.id;
  const { name, breed, species, weight } = req.body;

  const result = await pool.query(
    "UPDATE patients SET name= $1, breed = $2, species = $3, weight = $4 WHERE id = $5 RETURNING *",
    [name, breed, species, weight, id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe un paciente con ese id",
    });
  }

  return res.json(result.rows[0]);
};

export const deletePatient = async (req, res) => {
  if (req.role !== 'VETERINARIO') {
    return res.status(403).json({ message: "No autorizado" });
  }

  const result = await pool.query("DELETE FROM patients WHERE id = $1", [
    req.params.id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe una tarea con ese id",
    });
  }
  return res.sendStatus(204);
};