// src/context/ClientsContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { getAllClientsRequest, createClientRequest, deleteClientRequest } from '../api/clients.api';

const ClientsContext = createContext();

export const useClients = () => useContext(ClientsContext);

export const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState([]);

  const fetchClients = useCallback(async () => {
    try {
      const response = await getAllClientsRequest();
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  }, []);

  const addClient = useCallback(async (client) => {
    try {
      const response = await createClientRequest(client);
      setClients((prevClients) => [...prevClients, response.data]);
    } catch (error) {
      console.error('Error adding client:', error);
    }
  }, []);

  const deleteClient = useCallback(async (id) => {
    try {
      await deleteClientRequest(id);
      setClients((prevClients) => prevClients.filter(client => client.id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  }, []);

  return (
    <ClientsContext.Provider value={{ clients, fetchClients, addClient, deleteClient }}>
      {children}
    </ClientsContext.Provider>
  );
};
