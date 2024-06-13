import axios from './axios';

export const getAllHospitalizationsRequest = () => axios.get('/veterinario/hospitalizations');

export const getHospitalizationRequest = (id) => axios.get(`/veterinario/hospitalizations/${id}`);

export const createHospitalizationRequest = (hospitalization) => axios.post('/veterinario/hospitalizations', hospitalization);

export const updateHospitalizationRequest = (id, hospitalization) => axios.put(`/veterinario/hospitalizations/${id}`, hospitalization);

export const deleteHospitalizationRequest = (id) => axios.delete(`/veterinario/hospitalizations/${id}`);
