import React, { useState, useEffect } from 'react';
import { useClients } from '../context/ClientsContext';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import RegisterClientModal from '../components/ui/clientes/RegisterClientModal';

const ClientsPage = () => {
  const { clients, fetchClients, deleteClient } = useClients();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleRegisterSuccess = () => {
    fetchClients();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Propietarios</h1>
        <button
          onClick={openModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Registrar Propietario
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal table-auto">
          <thead>
            <tr>
              <th className="w-1/12 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="w-2/12 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="w-2/12 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Cédula
              </th>
              <th className="w-2/12 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Teléfono
              </th>
              <th className="w-3/12 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Dirección
              </th>
              <th className="w-2/12 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="w-2/12 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fecha de Creación
              </th>
              <th className="w-2/12 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {client.id}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {client.full_name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {client.cedula}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {client.phone}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {client.address}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {client.email}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {new Date(client.created_at).toLocaleDateString()}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex space-x-2">
                  <button
                    onClick={() => console.log(`Edit client ${client.id}`)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
                  >
                    <FaEdit className="mr-2" /> Editar
                  </button>
                  <button
                    onClick={() => deleteClient(client.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center"
                  >
                    <FaTrash className="mr-2" /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <RegisterClientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </div>
  );
};

export default ClientsPage;
