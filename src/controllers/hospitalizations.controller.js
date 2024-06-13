// src/controllers/hospitalizationsController.js
import { pool } from "../db.js";
import { createHospitalizationSchema, updateHospitalizationSchema } from "../schemas/hospitalization.schema.js";

// Obtener todas las hospitalizaciones
export const getAllHospitalizations = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT h.id, h.patient_id, h.admission_date, h.estimated_days, h.patient_type, h.hospitalization_type, 
             h.prognosis, h.belongings, h.observations, h.diet, h.charge_service, p.name as patient_name
      FROM hospitalizations h
      LEFT JOIN patients p ON h.patient_id = p.id
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// Obtener una hospitalización por su ID
export const getHospitalization = async (req, res, next) => {
  try {
    const { hospitalizationId } = req.params;
    const result = await pool.query(`
      SELECT h.id, h.patient_id, h.admission_date, h.estimated_days, h.patient_type, h.hospitalization_type, 
             h.prognosis, h.belongings, h.observations, h.diet, h.charge_service, p.name as patient_name
      FROM hospitalizations h
      LEFT JOIN patients p ON h.patient_id = p.id
      WHERE h.id = $1
    `, [hospitalizationId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Hospitalización no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva hospitalización
export const createHospitalization = async (req, res, next) => {
  try {
    const validatedData = createHospitalizationSchema.parse(req.body);
    const { patient_id, admission_date, estimated_days, patient_type, hospitalization_type, prognosis, belongings, observations, diet, charge_service } = validatedData;

    const result = await pool.query(
      "INSERT INTO hospitalizations (patient_id, admission_date, estimated_days, patient_type, hospitalization_type, prognosis, belongings, observations, diet, charge_service) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [patient_id, admission_date, estimated_days, patient_type, hospitalization_type, prognosis, belongings, observations, diet, charge_service]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Actualizar información de una hospitalización
export const updateHospitalization = async (req, res, next) => {
  try {
    const { hospitalizationId } = req.params;
    const validatedData = updateHospitalizationSchema.parse(req.body);
    const { patient_id, admission_date, estimated_days, patient_type, hospitalization_type, prognosis, belongings, observations, diet, charge_service } = validatedData;

    await pool.query(
      "UPDATE hospitalizations SET patient_id = $1, admission_date = $2, estimated_days = $3, patient_type = $4, hospitalization_type = $5, prognosis = $6, belongings = $7, observations = $8, diet = $9, charge_service = $10 WHERE id = $11",
      [patient_id, admission_date, estimated_days, patient_type, hospitalization_type, prognosis, belongings, observations, diet, charge_service, hospitalizationId]
    );

    res.json({ message: 'Hospitalización actualizada exitosamente.' });
  } catch (error) {
    next(error);
  }
};

// Eliminar una hospitalización
export const deleteHospitalization = async (req, res, next) => {
  try {
    const { hospitalizationId } = req.params;

    await pool.query("DELETE FROM hospitalizations WHERE id = $1", [hospitalizationId]);

    res.json({ message: 'Hospitalización eliminada exitosamente.' });
  } catch (error) {
    next(error);
  }
};
