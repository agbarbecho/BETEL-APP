import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  getAllHospitalizationsRequest, 
  getHospitalizationRequest,
  createHospitalizationRequest, 
  updateHospitalizationRequest, 
  updateHospitalizationStatusRequest,  // Importa la nueva función de la API
  deleteHospitalizationRequest 
} from '../api/hospitalizations.api';

const HospitalizacionContext = createContext();

export const useHospitalizacion = () => useContext(HospitalizacionContext);

export const HospitalizacionProvider = ({ children }) => {
  const [hospitalizations, setHospitalizations] = useState([]);
  const [hospitalization, setHospitalization] = useState(null);

  const fetchHospitalizations = useCallback(async () => {
    try {
      const response = await getAllHospitalizationsRequest();
      setHospitalizations(response.data);
    } catch (error) {
      console.error('Error fetching hospitalizations:', error);
    }
  }, []);

  const fetchHospitalization = useCallback(async (id) => {
    try {
      const response = await getHospitalizationRequest(id);
      setHospitalization(response.data);
    } catch (error) {
      console.error('Error fetching hospitalization:', error);
    }
  }, []);

  const addHospitalization = useCallback(async (hospitalization) => {
    try {
      const response = await createHospitalizationRequest(hospitalization);
      setHospitalizations((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding hospitalization:', error);
    }
  }, []);

  const updateHospitalization = useCallback(async (id, hospitalization) => {
    try {
      await updateHospitalizationRequest(id, hospitalization);
      setHospitalizations((prev) =>
        prev.map((h) => (h.id === id ? { ...h, ...hospitalization } : h))
      );
    } catch (error) {
      console.error('Error updating hospitalization:', error);
    }
  }, []);

  const updateHospitalizationStatus = useCallback(async (id, status) => {
    try {
      await updateHospitalizationStatusRequest(id, status);
      setHospitalizations((prev) =>
        prev.map((h) => (h.id === id ? { ...h, is_hospitalized: status } : h))
      );
    } catch (error) {
      console.error('Error updating hospitalization status:', error);
    }
  }, []);

  const deleteHospitalization = useCallback(async (id) => {
    try {
      await deleteHospitalizationRequest(id);
      setHospitalizations((prev) => prev.filter((h) => h.id !== id));
    } catch (error) {
      console.error('Error deleting hospitalization:', error);
    }
  }, []);

  return (
    <HospitalizacionContext.Provider value={{ 
      hospitalizations, 
      hospitalization,
      fetchHospitalizations, 
      fetchHospitalization,
      addHospitalization, 
      updateHospitalization, 
      updateHospitalizationStatus, // Provee la nueva función en el contexto
      deleteHospitalization 
    }}>
      {children}
    </HospitalizacionContext.Provider>
  );
};
