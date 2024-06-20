import React, { createContext, useContext, useState, useCallback } from 'react';
import { getAllClientsRequest, getClientRequest, createClientRequest, updateClientRequest, deleteClientRequest } from '../api/clients.api';

const ClientsContext = createContext();

export const useClients = () => useContext(ClientsContext);

export const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [currentClient, setCurrentClient] = useState(null);

  const fetchClients = useCallback(async () => {
    try {
      const response = await getAllClientsRequest();
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  }, []);

  const fetchClient = useCallback(async (id) => {
    try {
      const response = await getClientRequest(id);
      setCurrentClient(response.data);
    } catch (error) {
      console.error('Error fetching client:', error);
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

  const updateClient = useCallback(async (id, client) => {
    try {
      await updateClientRequest(id, client);
      setClients((prevClients) =>
        prevClients.map((c) => (c.id === id ? { ...c, ...client } : c))
      );
    } catch (error) {
      console.error('Error updating client:', error);
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
    <ClientsContext.Provider value={{ clients, currentClient, fetchClients, fetchClient, addClient, updateClient, deleteClient }}>
      {children}
    </ClientsContext.Provider>
  );
};
