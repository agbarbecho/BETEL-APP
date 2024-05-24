// src/context/ClientContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllClientsRequest, getClientRequest } from '../api/clients.api';

const ClientContext = createContext();

export const useClient = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);

  const fetchClients = async () => {
    const response = await getAllClientsRequest();
    setClients(response.data);
  };

  const getClient = async (id) => {
    const response = await getClientRequest(id);
    setClient(response.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <ClientContext.Provider value={{ clients, client, getClient }}>
      {children}
    </ClientContext.Provider>
  );
};
