// src/pages/DetallePage.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useClient } from '../context/ClientContext';

const DetallePage = () => {
  const { id } = useParams();
  const { client, getClient } = useClient();

  useEffect(() => {
    getClient(id);
  }, [id, getClient]);

  if (!client) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalles del Propietario</h1>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Información del Propietario</h2>
        <p><strong>Cédula:</strong> {client.cedula}</p>
        <p><strong>Nombre Completo:</strong> {client.full_name}</p>
        <p><strong>Teléfono:</strong> {client.phone}</p>
        <p><strong>Dirección:</strong> {client.address}</p>
        <p><strong>Email:</strong> {client.email}</p>
      </div>
    </div>
  );
};

export default DetallePage;
