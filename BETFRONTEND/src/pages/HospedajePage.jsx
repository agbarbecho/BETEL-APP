import React, { useState, useEffect } from 'react';
import { useHospedaje } from '../context/HospedajeContext';
import { useClients } from '../context/ClientsContext';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HospedajePage = () => {
  const { hospedajes, fetchHospedajes } = useHospedaje();
  const { clients, fetchClients } = useClients();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hospedajesPerPage, setHospedajesPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHospedajes();
    fetchClients();
  }, [fetchHospedajes, fetchClients]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleHospedajesPerPageChange = (event) => {
    setHospedajesPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const filteredHospedajes = hospedajes.filter(
    (hospedaje) =>
      (clients.find(client => client.id === hospedaje.patient_id)?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospedaje.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastHospedaje = currentPage * hospedajesPerPage;
  const indexOfFirstHospedaje = indexOfLastHospedaje - hospedajesPerPage;
  const currentHospedajes = filteredHospedajes.slice(indexOfFirstHospedaje, indexOfLastHospedaje);

  const paginateNext = () => setCurrentPage(currentPage + 1);
  const paginatePrev = () => setCurrentPage(currentPage - 1);

  const handleAddHospedaje = () => {
    navigate('/hospedaje/registro'); // Navega a la página de registro de hospedaje
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Hospedaje</h1>
        <button
          className="bg-green-300 text-white px-4 py-2 rounded hover:bg-green-500"
          onClick={handleAddHospedaje}
        >
          Ingresar Hospedaje
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
              value={hospedajesPerPage}
              onChange={handleHospedajesPerPageChange}
              className="border border-gray-300 rounded px-2 py-1 mx-2"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <button
              onClick={paginateNext}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
              disabled={indexOfLastHospedaje >= filteredHospedajes.length}
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar por notas, cliente o mascota"
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
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre de Mascota
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre del Propietario
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de Ingreso
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de Retiro
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Costo
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Notas
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {currentHospedajes.map((hospedaje) => {
                const client = clients.find(client => client.id === hospedaje.patient_id);
                return (
                  <tr key={hospedaje.id} className="hover:bg-gray-100">
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {client?.pets.find(pet => pet.pet_id === hospedaje.patient_id)?.pet_name}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {client?.full_name}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {new Date(hospedaje.start_date).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {new Date(hospedaje.end_date).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {hospedaje.cost}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {hospedaje.notes}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button className="text-blue-500 hover:underline">Ver Detalles</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HospedajePage;










