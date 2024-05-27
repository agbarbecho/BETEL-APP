import React, { createContext, useContext, useState, useCallback } from "react";
import {
  getAllClientsRequest,
  getAllPatientsRequest,
} from "../api/clients.api";

const ClientsContext = createContext();

export const useClients = () => {
  return useContext(ClientsContext);
};

export const ClientsProvider = ({ children }) => {
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
    <ClientsContext.Provider
      value={{ clients, patients, fetchClients, fetchPatients }}
    >
      {children}
    </ClientsContext.Provider>
  );
};
