import React, { createContext, useContext, useState, useCallback } from 'react';
import { getAllHospedajeRequest, createHospedajeRequest } from '../api/hospedaje.api';

const HospedajeContext = createContext();

export const useHospedaje = () => useContext(HospedajeContext);

export const HospedajeProvider = ({ children }) => {
  const [hospedajes, setHospedajes] = useState([]);

  const fetchHospedajes = useCallback(async () => {
    try {
      const response = await getAllHospedajeRequest();
      setHospedajes(response.data);
    } catch (error) {
      console.error('Error fetching hospedajes:', error);
    }
  }, []);

  const addHospedaje = useCallback(async (hospedaje) => {
    try {
      const response = await createHospedajeRequest(hospedaje);
      setHospedajes((prevHospedajes) => [...prevHospedajes, response.data]);
    } catch (error) {
      console.error('Error adding hospedaje:', error);
    }
  }, []);

  return (
    <HospedajeContext.Provider value={{ hospedajes, fetchHospedajes, addHospedaje }}>
      {children}
    </HospedajeContext.Provider>
  );
};

