import React, { useState } from 'react';
import { useClients } from '../context/ClientsContext';
import ConsultorioInput from '../components/ui/consultorio/ConsultorioInput';
import ConsultorioButton from '../components/ui/consultorio/ConsultorioButton';
import { FaPlus, FaUser } from 'react-icons/fa';

const ClientsPage = () => {
  const { addClient } = useClients();
  const [clientData, setClientData] = useState({ full_name: '', cedula: '', phone: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addClient(clientData);
    setClientData({ full_name: '', cedula: '', phone: '' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registrar Propietario</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <div className="mb-4">
          <ConsultorioInput
            label="Nombre Completo"
            placeholder="Nombre Completo"
            icon={<FaUser />}
            name="full_name"
            value={clientData.full_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <ConsultorioInput
            label="Cédula"
            placeholder="Cédula"
            name="cedula"
            value={clientData.cedula}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <ConsultorioInput
            label="Teléfono"
            placeholder="Teléfono"
            name="phone"
            value={clientData.phone}
            onChange={handleChange}
          />
        </div>
        <ConsultorioButton text="Registrar" icon={<FaPlus />} />
      </form>
    </div>
  );
};

export default ClientsPage;
