import React, { useState, useEffect } from 'react';
import { useConsultorio } from '../context/ConsultorioContext';
import ConsultorioInput from '../components/ui/consultorio/ConsultorioInput';
import ConsultorioButton from '../components/ui/consultorio/ConsultorioButton';
import RegisterClientModal from '../components/ui/consultorio/RegisterClientModal';
import { FaPlus, FaUser, FaSearch, FaDog } from 'react-icons/fa';

const ConsultorioPage = () => {
  const { clients, patients, fetchClients, fetchPatients } = useConsultorio();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            />
          </div>
          <div className="flex-1 mb-4 md:mb-0 md:ml-2">
            <ConsultorioInput
              label="Mascota"
              placeholder="Buscar por nombre"
              icon={<FaDog />}
            />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <ConsultorioButton text="Buscar" icon={<FaSearch />} />
        </div>
        <h2 className="text-xl font-bold mt-6 mb-2 text-center">Resultados</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-center">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-300">Identificador</th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Nombre</th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Teléfono</th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Mascotas</th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b">
                  <td className="border-t px-4 py-3">{client.cedula}</td>
                  <td className="border-t px-4 py-3">{client.full_name}</td>
                  <td className="border-t px-4 py-3">{client.phone}</td>
                  <td className="border-t px-4 py-3">
                    {patients
                      .filter((patient) => patient.client_id === client.id)
                      .map((patient) => patient.name)
                      .join(', ')}
                  </td>
                  <td className="border-t px-4 py-3">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                      <FaSearch />
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
