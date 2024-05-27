import React, { useState, useEffect } from 'react';
import { useConsultorio } from '../context/ClientsContext';
import { useNavigate } from 'react-router-dom';
import ConsultorioInput from '../components/ui/consultorio/ConsultorioInput';
import ConsultorioButton from '../components/ui/consultorio/ConsultorioButton';
import RegisterClientModal from '../components/ui/consultorio/RegisterClientModal';
import { FaPlus, FaUser, FaSearch, FaDog, FaChevronRight } from 'react-icons/fa';

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

  const clientsToShow = searchPet 
    ? filteredClients.filter((client) =>
        filteredPatients.some((patient) => patient.client_id === client.id)
      )
    : filteredClients;

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
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 mb-4 md:mb-0 md:mr-2">
            <ConsultorioInput
              label="Propietario"
              placeholder="Buscar por nombre o cédula"
              icon={<FaUser />}
              value={searchClient}
              onChange={handleClientSearchChange}
            />
          </div>
          <div className="flex-1 mb-4 md:mb-0 md:ml-2">
            <ConsultorioInput
              label="Mascota"
              placeholder="Buscar por nombre"
              icon={<FaDog />}
              value={searchPet}
              onChange={handlePetSearchChange}
            />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <ConsultorioButton text="Buscar" icon={<FaSearch />} />
        </div>
        <h2 className="text-xl font-bold mt-6 mb-2">Resultados</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-center">Identificador</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-center">Nombre</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-center">Teléfono</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-center">Mascotas</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientsToShow.map((client) => (
              <tr key={client.id} className="border-b">
                <td className="border-t px-4 py-3 text-center">{client.cedula}</td>
                <td className="border-t px-4 py-3 text-center">{client.full_name}</td>
                <td className="border-t px-4 py-3 text-center">{client.phone}</td>
                <td className="border-t px-4 py-3 text-center">
                  {patients
                    .filter((patient) => patient.client_id === client.id)
                    .map((patient) => patient.name)
                    .join(', ')}
                </td>
                <td className="border-t px-4 py-3 text-center">
                  <button
                    onClick={() => navigate(`/veterinario/patients/${client.id}`)}
                    className="bg-blue-500 text-white px-2 py-1 rounded flex items-center justify-center mx-auto"
                  >
                    <FaChevronRight />
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

export default ConsultorioPage;
