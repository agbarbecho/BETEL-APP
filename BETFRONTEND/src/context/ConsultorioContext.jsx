// src/context/ConsultorioContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import {
  getAllClientsRequest,
  getAllPatientsRequest,
} from "../api/consultorio.api";

const ConsultorioContext = createContext();

export const useConsultorio = () => {
  return useContext(ConsultorioContext);
};

export const ConsultorioProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [patients, setPatients] = useState([]);

  const fetchClients = useCallback(async () => {
    try {
      const response = await getAllClientsRequest();
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }, []);

  const fetchPatients = useCallback(async () => {
    try {
      const response = await getAllPatientsRequest();
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }, []);

  return (
    <ConsultorioContext.Provider
      value={{ clients, patients, fetchClients, fetchPatients }}
    >
      {children}
    </ConsultorioContext.Provider>
  );
};
