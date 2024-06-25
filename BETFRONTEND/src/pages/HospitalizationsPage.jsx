import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHospitalizacion } from '../context/HospitalizacionContext';
import { FaChevronLeft, FaChevronRight, FaEllipsisV, FaUser, FaArrowUp, FaArrowDown, FaPlus, FaEdit } from 'react-icons/fa';
import RegisterHospitalizationModal from '../components/modals/RegisterHospitalizationModal';

const HospitalizationsPage = () => {
  const { hospitalizations, fetchHospitalizations, updateHospitalizationStatus } = useHospitalizacion();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hospitalizationsPerPage, setHospitalizationsPerPage] = useState(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hospitalizationToEdit, setHospitalizationToEdit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHospitalizations();
  }, [fetchHospitalizations]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleHospitalizationsPerPageChange = (event) => {
    setHospitalizationsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const filteredHospitalizations = hospitalizations.filter((hosp) => {
    const patientName = hosp.patient_name || '';
    const observations = hosp.observations || '';

    return (
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      observations.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastHospitalization = currentPage * hospitalizationsPerPage;
  const indexOfFirstHospitalization = indexOfLastHospitalization - hospitalizationsPerPage;
  const currentHospitalizations = filteredHospitalizations.slice(indexOfFirstHospitalization, indexOfLastHospitalization);

  const paginateNext = () => setCurrentPage(currentPage + 1);
  const paginatePrev = () => setCurrentPage(currentPage - 1);

  const handleViewDetails = (id) => {
    navigate(`/veterinario/patients/${id}`);
  };

  const handleDischarge = async (id) => {
    try {
      await updateHospitalizationStatus(id, false);
    } catch (error) {
      console.error("Error al actualizar el estado de hospitalización", error);
    }
  };

  const handleReHospitalize = async (id) => {
    try {
      await updateHospitalizationStatus(id, true);
    } catch (error) {
      console.error("Error al actualizar el estado de hospitalización", error);
    }
  };

  const toggleDropdown = (id) => {
    if (isDropdownOpen === id) {
      setIsDropdownOpen(null);
    } else {
      setIsDropdownOpen(id);
    }
  };

  const openModal = (hospitalization = null) => {
    setHospitalizationToEdit(hospitalization);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setHospitalizationToEdit(null);
    setIsModalOpen(false);
  };

  const handleRegisterSuccess = () => {
    fetchHospitalizations();
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Lista de Hospitalizaciones</h1>
        <button
          onClick={() => openModal()}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Registrar Hospitalización
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
              value={hospitalizationsPerPage}
              onChange={handleHospitalizationsPerPageChange}
              className="border border-gray-300 rounded px-2 py-1 mx-2"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <button
              onClick={paginateNext}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
              disabled={indexOfLastHospitalization >= filteredHospitalizations.length}
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar por nombre de mascota o observaciones"
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
                  Fecha de Ingreso
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Días Estimados
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tipo de Paciente
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tipo de Hospitalización
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Pronóstico
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Observaciones
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {currentHospitalizations.map((hospitalization) => (
                <tr key={hospitalization.id} className="hover:bg-gray-100">
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {hospitalization.patient_name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {new Date(hospitalization.admission_date).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {hospitalization.estimated_days}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {hospitalization.patient_type}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {hospitalization.hospitalization_type}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {hospitalization.prognosis}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {hospitalization.observations}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className={
                        hospitalization.is_hospitalized ? 'text-green-500' : 'text-red-500'
                      }
                    >
                      {hospitalization.is_hospitalized ? 'Hospitalizado' : 'No Hospitalizado'}
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(hospitalization.id)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center"
                      >
                        <FaEllipsisV />
                      </button>
                      {isDropdownOpen === hospitalization.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                          <ul>
                            <li
                              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleViewDetails(hospitalization.id)}
                            >
                              <FaUser className="mr-2" />
                              Ver Perfil
                            </li>
                            <li
                              onClick={() => openModal(hospitalization)}
                              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            >
                              <FaEdit className="mr-2" />
                              Editar
                            </li>
                            {hospitalization.is_hospitalized ? (
                              <li
                                onClick={() => handleDischarge(hospitalization.id)}
                                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                              >
                                <FaArrowDown className="mr-2" />
                                Dar de Alta
                              </li>
                            ) : (
                              <li
                                onClick={() => handleReHospitalize(hospitalization.id)}
                                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                              >
                                <FaArrowUp className="mr-2" />
                                Re-Hospitalizar
                              </li>
                            )}
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
      <RegisterHospitalizationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onRegisterSuccess={handleRegisterSuccess}
        hospitalization={hospitalizationToEdit}
      />
    </div>
  );
};

export default HospitalizationsPage;
