import { pool } from "../db.js";
import { createHospitalizationSchema, updateHospitalizationSchema } from "../schemas/hospitalization.schema.js";


// Obtener todas las hospitalizaciones
export const getAllHospitalizations = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT h.id, h.patient_id, h.client_id, h.admission_date, h.estimated_days, h.patient_type, h.hospitalization_type, 
             h.prognosis, h.belongings, h.observations, h.diet, h.charge_service, h.is_hospitalized, 
             p.name as patient_name, c.full_name as client_name
      FROM hospitalizations h
      LEFT JOIN patients p ON h.patient_id = p.id
      LEFT JOIN clients c ON h.client_id = c.id
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};


// Obtener todas las hospitalizaciones, incluyendo las no activas
export const getAllHospitalizationsIncludingInactive = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT h.id, h.patient_id, h.admission_date, h.estimated_days, h.patient_type, h.hospitalization_type, 
             h.prognosis, h.belongings, h.observations, h.diet, h.charge_service, h.is_hospitalized, p.name as patient_name
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
      SELECT h.id, h.patient_id, h.client_id, h.admission_date, h.estimated_days, h.patient_type, h.hospitalization_type, 
             h.prognosis, h.belongings, h.observations, h.diet, h.charge_service, h.is_hospitalized, 
             p.name as patient_name, c.full_name as client_name
      FROM hospitalizations h
      LEFT JOIN patients p ON h.patient_id = p.id
      LEFT JOIN clients c ON h.client_id = c.id
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
    const { patient_id, client_id, admission_date, estimated_days, patient_type, hospitalization_type, prognosis, belongings, observations, diet, charge_service } = validatedData;
    const is_hospitalized = validatedData.is_hospitalized !== undefined ? validatedData.is_hospitalized : true;

    const result = await pool.query(
      "INSERT INTO hospitalizations (patient_id, client_id, admission_date, estimated_days, patient_type, hospitalization_type, prognosis, belongings, observations, diet, charge_service, is_hospitalized) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [patient_id, client_id, admission_date, estimated_days, patient_type, hospitalization_type, prognosis, belongings, observations, diet, charge_service, is_hospitalized]
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
    const { patient_id, client_id, admission_date, estimated_days, patient_type, hospitalization_type, prognosis, belongings, observations, diet, charge_service } = validatedData;
    const is_hospitalized = validatedData.is_hospitalized !== undefined ? validatedData.is_hospitalized : true;

    await pool.query(
      "UPDATE hospitalizations SET patient_id = $1, client_id = $2, admission_date = $3, estimated_days = $4, patient_type = $5, hospitalization_type = $6, prognosis = $7, belongings = $8, observations = $9, diet = $10, charge_service = $11, is_hospitalized = $12 WHERE id = $13",
      [patient_id, client_id, admission_date, estimated_days, patient_type, hospitalization_type, prognosis, belongings, observations, diet, charge_service, is_hospitalized, hospitalizationId]
    );

    res.json({ message: 'Hospitalización actualizada exitosamente.' });
  } catch (error) {
    next(error);
  }
};

// Actualizar estado de hospitalización
export const updateHospitalizationStatus = async (req, res, next) => {
  try {
    const { hospitalizationId } = req.params;
    const { is_hospitalized } = req.body;

    await pool.query(
      "UPDATE hospitalizations SET is_hospitalized = $1 WHERE id = $2",
      [is_hospitalized, hospitalizationId]
    );

    res.json({ message: 'Estado de hospitalización actualizado exitosamente.' });
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
