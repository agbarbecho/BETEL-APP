import axios from './axios';

export const getAllClientsRequest = () => axios.get('/veterinario/clients');

export const getClientRequest = (id) => axios.get(`/veterinario/clients/${id}`);

export const createClientRequest = (client) => axios.post('/veterinario/clients', client);

export const updateClientRequest = (id, client) => axios.put(`/veterinario/clients/${id}`, client);

export const deleteClientRequest = (id) => axios.delete(`/veterinario/clients/${id}`);


