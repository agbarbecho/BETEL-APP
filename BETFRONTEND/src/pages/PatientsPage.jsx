import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import { FaPlus, FaEllipsisV, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PetsForm from '../pages/PetsForm';
import ContainerPatient from '../components/ui/clientes/ContainerPatient';
import PetsModal from '../components/modals/PetsModal';

const PatientsPage = () => {
  const { patients, fetchPatients, deletePatient } = usePatients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage, setPatientsPerPage] = useState(10);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleRegisterSuccess = () => {
    fetchPatients();
    closeModal();
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
    setCurrentPage(1);
  };

  const handlePatientsPerPageChange = (event) => {
    setPatientsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const paginateNext = () => setCurrentPage(currentPage + 1);
  const paginatePrev = () => setCurrentPage(currentPage - 1);

  const handleDeletePatient = (id) => {
    deletePatient(id);
    openDeletedModal();
  };

  const handleViewProfile = (id) => {
    navigate(`/veterinario/patients/${id}`);
  };

  return (
    <ContainerPatient className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Lista de Pacientes</h1>
        <button
          onClick={openModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Registrar Paciente
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button
              onClick={paginatePrev}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
              disabled={indexOfFirstPatient === 0}
            >
              <FaChevronLeft />
            </button>
            <select
              value={patientsPerPage}
              onChange={handlePatientsPerPageChange}
              className="border border-gray-300 rounded px-2 py-1 mx-2"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <button
              onClick={paginateNext}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
              disabled={indexOfLastPatient >= filteredPatients.length}
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar por nombre o propietario"
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
                  Nombre
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Especie
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Raza
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Edad
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Propietario
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-100">
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.species}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.breed}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.age}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {patient.client_name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => toggleDropdown(patient.id)}
                        className="text-gray-600 hover:text-gray-900 focus:outline-none mr-3"
                      >
                        <FaEllipsisV />
                      </button>
                      {isDropdownOpen === patient.id && (
                        <div className="relative">
                          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                            <button
                              onClick={() => handleViewProfile(patient.id)}
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                            >
                              Ver Perfil
                            </button>
                            <button
                              onClick={() => handleDeletePatient(patient.id)}
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                            >
                              Eliminar
                            </button>
                          </div>
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
      <PetsModal isOpen={isModalOpen} onClose={closeModal}>
        <PetsForm onClose={closeModal} onRegisterSuccess={handleRegisterSuccess} />
      </PetsModal>
      {isDeletedModalOpen && (
        <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-green-500 text-white p-4 rounded">
          <p>Paciente eliminado exitosamente.</p>
        </div>
      )}
    </ContainerPatient>
  );
};

export default PatientsPage;
