import React, { useState, useEffect } from 'react';
import { useConsultorio } from '../context/ConsultorioContext';
import { useNavigate } from 'react-router-dom';
import ConsultorioInput from '../components/ui/consultorio/ConsultorioInput';
import ConsultorioButton from '../components/ui/consultorio/ConsultorioButton';
import RegisterClientModal from '../components/ui/consultorio/RegisterClientModal';
import { FaPlus, FaUser, FaSearch, FaDog, FaLeaf } from 'react-icons/fa';

const ConsultorioPage = () => {
  const { clients, patients, fetchClients, fetchPatients } = useConsultorio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchClient, setSearchClient] = useState('');
  const [searchPet, setSearchPet] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
    fetchPatients();
  }, [fetchClients, fetchPatients]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleRegisterSuccess = () => {
    fetchClients();
    closeModal();
  };

  const handleClientSearchChange = (e) => {
    setSearchClient(e.target.value);
  };

  const handlePetSearchChange = (e) => {
    setSearchPet(e.target.value);
  };

  const filteredClients = clients.filter((client) => {
    const clientNameMatch = client.full_name.toLowerCase().includes(searchClient.toLowerCase());
    const clientCedulaMatch = client.cedula.toLowerCase().includes(searchClient.toLowerCase());
    return clientNameMatch || clientCedulaMatch;
  });

  const filteredPatients = patients.filter((patient) => 
    patient.name.toLowerCase().includes(searchPet.toLowerCase())
  );

  const clientsToShow = filteredClients.filter((client) =>
    filteredPatients.some((patient) => patient.client_id === client.id)
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Consultorio</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          onClick={openModal}
        >
          <FaPlus className="mr-2" /> Registrar propietario
        </button>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="flex-1 mb-2 md:mb-0">
            <ConsultorioInput
              label="Propietario"
              placeholder="Buscar por nombre o cédula"
              icon={<FaUser />}
              value={searchClient}
              onChange={handleClientSearchChange}
              className="w-full"
            />
          </div>
          <div className="flex-1 mb-2 md:mb-0">
            <ConsultorioInput
              label="Mascota"
              placeholder="Buscar por nombre"
              icon={<FaDog />}
              value={searchPet}
              onChange={handlePetSearchChange}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <ConsultorioButton text="Buscar" icon={<FaSearch />} />
        </div>
        <h2 className="text-xl font-bold mt-6 mb-2">Resultados</h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Identificador
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mascotas
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {clientsToShow.map((client) => (
                <tr key={client.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    {client.cedula}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    {client.full_name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    {client.phone}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    {filteredPatients
                      .filter((patient) => patient.client_id === client.id)
                      .map((patient) => patient.name)
                      .join(', ')}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <button
                      onClick={() => navigate(`/veterinario/patients/${client.id}`)}
                      className="bg-blue-500 text-white px-2 py-1 rounded flex items-center justify-center mx-auto"
                    >
                      <FaLeaf />
                    </button>
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
    </div>
  );
};

export default ConsultorioPage;
