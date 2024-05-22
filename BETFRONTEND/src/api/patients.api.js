import client from "./axios";

// Obtener todos los pacientes
export const getAllPatientsRequest = () => client.get('/veterinario/patients');

// Crear un nuevo paciente
export const createPatientRequest = (patient) => client.post('/veterinario/patients', patient);

// Eliminar un paciente por ID
export const deletePatientRequest = (id) => client.delete(`/veterinario/patients/${id}`);

// Obtener un paciente por ID
export const getPatientRequest = (id) => client.get(`/veterinario/patients/${id}`);

// Actualizar un paciente por ID
export const updatePatientRequest = (id, patient) => client.put(`/veterinario/patients/${id}`, patient);
