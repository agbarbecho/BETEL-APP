import axios from './axios';

// Clientes
export const getAllClientsRequest = () => axios.get('/veterinario/clients');
export const getClientRequest = (id) => axios.get(`/veterinario/clients/${id}`);
export const createClientRequest = (client) => axios.post('/veterinario/clients', client);
export const updateClientRequest = (id, client) => axios.put(`/veterinario/clients/${id}`, client);
export const deleteClientRequest = (id) => axios.delete(`/veterinario/clients/${id}`);
export const searchClientsRequest = (query) => axios.get(`/veterinario/clients?search=${query}`);

// Pacientes
export const getAllPatientsRequest = () => axios.get('/veterinario/patients');
export const getPatientRequest = (id) => axios.get(`/veterinario/patients/${id}`);
export const createPatientRequest = (patient) => axios.post('/veterinario/patients', patient);
export const updatePatientRequest = (id, patient) => axios.put(`/veterinario/patients/${id}`, patient);
export const deletePatientRequest = (id) => axios.delete(`/veterinario/patients/${id}`);
export const searchPatientsRequest = (query) => axios.get(`/veterinario/patients?search=${query}`);
