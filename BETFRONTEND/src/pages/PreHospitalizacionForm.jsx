// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import {
  FaLaptopMedical,
  FaStethoscope,
  FaNotesMedical,
  FaSyringe,
  FaMicroscope,
  FaPills,
  FaCut,
  FaHospitalAlt,
  FaUserMd,
  FaDog,
  FaHome
} from 'react-icons/fa';
import ReusableModal from '../components/modals/ReusableModal';
import PreHospitalizacionModal from '../components/modals/PreHospitalizacionModal';
import PreHospitalizacionForm from '../pages/PreHospitalizacionForm';
import { useClients } from '../context/ClientsContext';
import useSearchFilter from '../components/hooks/useSearchFilter';

const HomePage = () => {
  const { clients, fetchClients } = useClients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreHospModalOpen, setIsPreHospModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const { searchTerm, setSearchTerm, filteredData: filteredClients } = useSearchFilter(clients, ['full_name']);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const sections = [
    { name: 'Consulta Virtual', icon: <FaLaptopMedical />, color: 'bg-red-400' },
    { name: 'Consulta Médica', icon: <FaStethoscope />, color: 'bg-pink-400' },
    { name: 'Consulta Rápida', icon: <FaNotesMedical />, color: 'bg-red-400' },
    { name: 'Control Consulta', icon: <FaNotesMedical />, color: 'bg-yellow-400' },
    { name: 'Exámenes', icon: <FaMicroscope />, color: 'bg-yellow-400' },
    { name: 'Vacunación', icon: <FaSyringe />, color: 'bg-teal-400' },
    { name: 'Desparasitacion', icon: <FaPills />, color: 'bg-green-400' },
    { name: 'Baño o Corte', icon: <FaCut />, color: 'bg-blue-400' },
    { name: 'Guardería', icon: <FaHome />, color: 'bg-blue-400' },
    { name: 'Cirugía', icon: <FaUserMd />, color: 'bg-yellow-400' },
    { name: 'Hospitalización', icon: <FaHospitalAlt />, color: 'bg-yellow-400', onClick: () => setIsModalOpen(true) },
    { name: 'Certificado Médico', icon: <FaDog />, color: 'bg-green-400' },
  ];

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setIsModalOpen(false);
  };

  const handleContinue = () => {
    setIsPreHospModalOpen(true);
  };

  const closePreHospModal = () => {
    setIsPreHospModalOpen(false);
    setSelectedClient(null);
  };

  const handleRegisterSuccess = () => {
    console.log('Registro exitoso');
    setIsPreHospModalOpen(false);
    setSelectedClient(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">¿Qué deseas hacer hoy?</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-4 ${section.color} text-white rounded-full shadow-lg cursor-pointer`}
            onClick={section.onClick}
          >
            <div className="text-4xl mb-2">{section.icon}</div>
            <div className="text-center">{section.name}</div>
          </div>
        ))}
      </div>
      {selectedClient && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Selecciona al paciente y su propietario:</h2>
          <div className="flex items-center">
            <div className="flex-grow border border-gray-300 rounded px-4 py-2">
              {selectedClient.full_name} ({selectedClient.cedula})
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded ml-4 hover:bg-green-700"
              onClick={handleContinue}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Hospitalización"
        content={
          <div>
            <input
              type="text"
              placeholder="Buscar por nombre del cliente"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
            />
            {searchTerm && (
              <div>
                {filteredClients.length > 0 ? (
                  <ul>
                    {filteredClients.map((client) => (
                      <li
                        key={client.id}
                        className="mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded"
                        onClick={() => handleClientSelect(client)}
                      >
                        {client.full_name} ({client.cedula})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No se encontraron resultados.</p>
                )}
              </div>
            )}
          </div>
        }
        actions={
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={closeModal}>
            Confirmar
          </button>
        }
      />
      <PreHospitalizacionModal
        isOpen={isPreHospModalOpen}
        onClose={closePreHospModal}
      >
        <PreHospitalizacionForm onClose={closePreHospModal} onRegisterSuccess={handleRegisterSuccess} />
      </PreHospitalizacionModal>
    </div>
  );
};

export default HomePage;

