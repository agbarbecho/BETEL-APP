// src/api/hospedaje.api.js
import axios from './axios';

export const getAllHospedajeRequest = () => axios.get('/hospedaje');
export const createHospedajeRequest = (data) => axios.post('/hospedaje', data);
