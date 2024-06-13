// src/pages/HospitalizationsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHospitalizacion } from '../context/HospitalizacionContext';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HospitalizationsPage = () => {
  const { hospitalizations, fetchHospitalizations } = useHospitalizacion();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hospitalizationsPerPage, setHospitalizationsPerPage] = useState(10);
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

  const filteredHospitalizations = hospitalizations.filter(
    (hosp) =>
      hosp.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hosp.observations.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastHospitalization = currentPage * hospitalizationsPerPage;
  const indexOfFirstHospitalization = indexOfLastHospitalization - hospitalizationsPerPage;
  const currentHospitalizations = filteredHospitalizations.slice(indexOfFirstHospitalization, indexOfLastHospitalization);

  const paginateNext = () => setCurrentPage(currentPage + 1);
  const paginatePrev = () => setCurrentPage(currentPage - 1);

  const handleViewDetails = (id) => {
    navigate(`/detalles-hospitalizacion/${id}`);
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Lista de Hospitalizaciones</h1>
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
                    <button
                      onClick={() => handleViewDetails(hospitalization.id)}
                      className="text-blue-500 hover:underline"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HospitalizationsPage;
