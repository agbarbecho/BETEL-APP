// src/pages/ClientsPage.jsx
import React, { useState, useEffect } from 'react';
import { useClients } from '../context/ClientsContext';
import { FaPlus, FaEllipsisV, FaUser, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import RegisterClientModal from '../components/ui/clientes/RegisterClientModal';
import ContainerClient from '../components/ui/clientes/ContainerClient';
import ReusableModal from '../components/modals/ReusableModal';

const ClientsPage = () => {
  const { clients, fetchClients, deleteClient } = useClients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage, setClientsPerPage] = useState(10);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);

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

  const openDeletedModal = () => {
    setIsDeletedModalOpen(true);
    setTimeout(() => {
      setIsDeletedModalOpen(false);
    }, 3000);
  };

  const toggleDropdown = (id) => {
    if (isDropdownOpen === id) {
      setIsDropdownOpen(null);
    } else {
      setIsDropdownOpen(id);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleClientsPerPageChange = (event) => {
    setClientsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const filteredClients = clients.filter(
    (client) =>
      client.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cedula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  const paginateNext = () => setCurrentPage(currentPage + 1);
  const paginatePrev = () => setCurrentPage(currentPage - 1);

  const handleDeleteClient = (id) => {
    deleteClient(id);
    openDeletedModal();
  };

  return (
    <ContainerClient className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Lista de Propietarios</h1>
        <button
          onClick={openModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Registrar Propietario
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button
              onClick={paginatePrev}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            <select
              value={clientsPerPage}
              onChange={handleClientsPerPageChange}
              className="border border-gray-300 rounded px-2 py-1 mx-2"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <button
              onClick={paginateNext}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
              disabled={indexOfLastClient >= filteredClients.length}
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar por nombre o cédula"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Cédula
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Celular
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Fecha de Creación
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-800 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {currentClients.map((client) => (
                <tr key={client.id}>
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
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(client.id)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center"
                      >
                        <FaEllipsisV />
                      </button>
                      {isDropdownOpen === client.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                          <ul>
                            <li className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
                              <FaUser className="mr-2" />
                              Ver Perfil
                            </li>
                            <li
                              onClick={() => {
                                handleDeleteClient(client.id);
                              }}
                              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            >
                              <FaTrash className="mr-2" />
                              Eliminar
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <RegisterClientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onRegisterSuccess={handleRegisterSuccess}
      />
      <ReusableModal
        isOpen={isDeletedModalOpen}
        onClose={() => setIsDeletedModalOpen(false)}
        title="Cliente Eliminado"
        content={
          <div className="text-center">
            <svg
              className="mx-auto mb-4 w-14 h-14 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-gray-700">Cliente eliminado correctamente.</p>
          </div>
        }
      />
    </ContainerClient>
  );
};

export default ClientsPage;
