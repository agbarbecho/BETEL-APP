import { pool } from "../db.js";

// Obtener todos los clientes con sus mascotas
export const getAllClients = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.id as client_id, 
        c.full_name as client_name, 
        c.cedula, 
        c.phone, 
        c.address, 
        c.email, 
        c.created_at, 
        json_agg(
          json_build_object(
            'id', p.id,
            'name', p.name,
            'breed', p.breed,
            'species', p.species,
            'weight', p.weight,
            'birth_date', p.birth_date,
            'color', p.color,
            'size', p.size,
            'reproductive_status', p.reproductive_status
          ) ORDER BY p.id
        ) as pets
      FROM clients c
      LEFT JOIN patients p ON c.id = p.client_id
      GROUP BY c.id
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// Obtener un cliente específico con sus pacientes
export const getClientById = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const result = await pool.query(`
      SELECT 
        c.id as client_id, 
        c.full_name as client_name, 
        c.cedula, 
        c.phone, 
        c.address, 
        c.email, 
        c.created_at, 
        json_agg(
          json_build_object(
            'id', p.id,
            'name', p.name,
            'breed', p.breed,
            'species', p.species,
            'weight', p.weight,
            'birth_date', p.birth_date,
            'color', p.color,
            'size', p.size,
            'reproductive_status', p.reproductive_status
          )
        ) as pets
      FROM clients c
      LEFT JOIN patients p ON c.id = p.client_id
      WHERE c.id = $1
      GROUP BY c.id
    `, [clientId]);

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
    const { cedula, full_name, email, phone, address } = req.body;

    const result = await pool.query(
      "INSERT INTO clients (cedula, full_name, email, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [cedula, full_name, email, phone, address]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Actualizar información de un cliente
export const updateClient = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const { full_name, email, phone, cedula, address } = req.body;

    await pool.query(
      "UPDATE clients SET full_name = $1, email = $2, phone = $3, cedula = $4, address = $5 WHERE id = $6",
      [full_name, email, phone, cedula, address, clientId]
    );

    res.json({ message: 'Cliente actualizado exitosamente.' });
  } catch (error) {
    next(error);
  }
};

// Eliminar un cliente
export const deleteClient = async (req, res, next) => {
  try {
    const { clientId } = req.params;

    await pool.query("DELETE FROM clients WHERE id = $1", [clientId]);

    res.json({ message: 'Cliente eliminado exitosamente.' });
  } catch (error) {
    next(error);
  }
};
