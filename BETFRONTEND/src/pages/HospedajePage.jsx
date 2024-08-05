import React, { useState, useEffect } from 'react';
import { useHospedaje } from '../context/HospedajeContext';
import { useClients } from '../context/ClientsContext';
import { usePatients } from '../context/PatientContext';
import RegisterHospedajeModal from '../components/modals/RegisterHospedajeModal';
import { FaPlus, FaChevronLeft, FaChevronRight, FaEllipsisV, FaUser, FaEdit } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';

const HospedajePage = () => {
  const { hospedajes, fetchHospedajes, deleteHospedaje } = useHospedaje();
  const { clients, fetchClients } = useClients();
  const { patients, fetchPatients } = usePatients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHospedaje, setSelectedHospedaje] = useState(null);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hospedajesPerPage, setHospedajesPerPage] = useState(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  useEffect(() => {
    fetchClients();
    fetchPatients();
    fetchHospedajes();
  }, [fetchClients, fetchPatients, fetchHospedajes]);

  useEffect(() => {
    if (hospedajes.length && clients.length && patients.length) {
      const combinedData = hospedajes.map(hospedaje => {
        const client = clients.find(client => client.client_id === hospedaje.client_id);
        const patient = patients.find(patient => patient.id === hospedaje.patient_id);
        return {
          ...hospedaje,
          client_name: client ? client.client_name : 'Cliente no encontrado',
          patient_name: patient ? patient.name : 'Paciente no encontrado',
        };
      });
      setData(combinedData);
    }
  }, [hospedajes, clients, patients]);

  const handleAddHospedaje = () => {
    setSelectedHospedaje(null);
    setIsModalOpen(true);
  };

  const handleEditHospedaje = (hospedaje) => {
    setSelectedHospedaje(hospedaje);
    setIsModalOpen(true);
  };

  const handleDeleteHospedaje = async (id) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este registro de hospedaje?');
    if (confirmed) {
      await deleteHospedaje(id);
    }
  };

  const handleRegisterSuccess = () => {
    fetchHospedajes();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleHospedajesPerPageChange = (event) => {
    setHospedajesPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const filteredData = data.filter((hospedaje) => {
    return (
      hospedaje.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospedaje.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastHospedaje = currentPage * hospedajesPerPage;
  const indexOfFirstHospedaje = indexOfLastHospedaje - hospedajesPerPage;
  const currentHospedajes = filteredData.slice(indexOfFirstHospedaje, indexOfLastHospedaje);

  const paginateNext = () => setCurrentPage(currentPage + 1);
  const paginatePrev = () => setCurrentPage(currentPage - 1);

  const toggleDropdown = (id) => {
    if (isDropdownOpen === id) {
      setIsDropdownOpen(null);
    } else {
      setIsDropdownOpen(id);
    }
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Lista de Hospedajes</h1>
        <button
          onClick={handleAddHospedaje}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Registrar Hospedaje
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
              disabled={indexOfLastHospedaje >= filteredData.length}
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar por nombre de paciente o cliente"
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
                  ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de Inicio
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de Fin
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
              {currentHospedajes.map((hospedaje) => (
                <tr key={hospedaje.id} className="hover:bg-gray-100">
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {hospedaje.id}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {hospedaje.patient_name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {hospedaje.client_name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {format(parseISO(hospedaje.start_date), 'dd/MM/yyyy')}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {format(parseISO(hospedaje.end_date), 'dd/MM/yyyy')}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {hospedaje.notes}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(hospedaje.id)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center"
                      >
                        <FaEllipsisV />
                      </button>
                      {isDropdownOpen === hospedaje.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                          <ul>
                            <li
                              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                              onClick={() => console.log('Ver Perfil')}
                            >
                              <FaUser className="mr-2" />
                              Ver Perfil
                            </li>
                            <li
                              onClick={() => handleEditHospedaje(hospedaje)}
                              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            >
                              <FaEdit className="mr-2" />
                              Editar
                            </li>
                            <li
                              onClick={() => handleDeleteHospedaje(hospedaje.id)}
                              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            >
                              <FaEdit className="mr-2" />
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
      <RegisterHospedajeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
        hospedaje={selectedHospedaje}
      />
    </div>
  );
};

export default HospedajePage;
