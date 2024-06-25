import React, { useState, useEffect } from 'react';
import { useHospitalizacion } from '../../context/HospitalizacionContext';
import { useClients } from '../../context/ClientsContext';

const RegisterHospitalizationModal = ({ isOpen, onClose, onRegisterSuccess, hospitalization }) => {
  const initialFormData = {
    patient_id: '',
    client_id: '',
    admission_date: '',
    estimated_days: '',
    patient_type: '',
    hospitalization_type: '',
    prognosis: '',
    belongings: '',
    observations: '',
    diet: '',
    charge_service: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [clientsLoaded, setClientsLoaded] = useState(false);

  const { addHospitalization, updateHospitalization } = useHospitalizacion();
  const { clients, fetchClients } = useClients();

  useEffect(() => {
    if (isOpen) {
      fetchClients().then(() => setClientsLoaded(true));
    }
  }, [isOpen, fetchClients]);

  useEffect(() => {
    if (isOpen && clientsLoaded) {
      if (hospitalization) {
        const selectedClient = clients.find(client =>
          client.pets.some(pet => pet.id === hospitalization.patient_id)
        );
        const selectedPet = selectedClient ? selectedClient.pets.find(pet => pet.id === hospitalization.patient_id) : null;
        const searchTerm = selectedPet
          ? `${selectedPet.name} - ${selectedClient.client_name} (${selectedClient.cedula})`
          : '';

        setFormData({
          patient_id: hospitalization.patient_id,
          client_id: hospitalization.client_id,
          admission_date: new Date(hospitalization.admission_date).toISOString().split('T')[0],
          estimated_days: hospitalization.estimated_days,
          patient_type: hospitalization.patient_type,
          hospitalization_type: hospitalization.hospitalization_type,
          prognosis: hospitalization.prognosis,
          belongings: hospitalization.belongings,
          observations: hospitalization.observations,
          diet: hospitalization.diet,
          charge_service: hospitalization.charge_service,
        });
        setSearchTerm(searchTerm);
      } else {
        setFormData(initialFormData);
        setSearchTerm('');
      }
    }
  }, [isOpen, clientsLoaded, hospitalization, clients]);

  useEffect(() => {
    if (searchTerm && !hospitalization) {
      const filtered = clients.flatMap(client => {
        return client.pets.map(pet => ({
          ...pet,
          clientId: client.client_id,
          clientName: client.client_name,
          clientCedula: client.cedula,
        }));
      }).filter(pet =>
        `${pet.name} ${pet.clientName} ${pet.clientCedula}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients([]);
    }
  }, [searchTerm, clients, hospitalization]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        admission_date: new Date(formData.admission_date).toISOString(),
        estimated_days: parseInt(formData.estimated_days, 10)
      };

      if (hospitalization) {
        await updateHospitalization(hospitalization.id, formattedData);
      } else {
        await addHospitalization(formattedData);
      }

      onRegisterSuccess();
      setFormData(initialFormData);
      setSearchTerm('');
      setFilteredClients([]);
      onClose();
    } catch (error) {
      console.error('Error al registrar la hospitalización:', error);
    }
  };

  const handleSelectPatient = (patient) => {
    setFormData((prevData) => ({
      ...prevData,
      patient_id: patient.id,
      client_id: patient.clientId,
    }));
    setSearchTerm(`${patient.name} - ${patient.clientName} (${patient.clientCedula})`);
    setFilteredClients([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-7xl">
        <h2 className="text-2xl mb-4">{hospitalization ? 'Editar Hospitalización' : 'Registrar Hospitalización'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <label className="block text-gray-700">Buscar Paciente</label>
            <input
              type="text"
              name="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
              disabled={!!hospitalization}
            />
            {searchTerm && !hospitalization && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto w-full">
                {filteredClients.map(pet => (
                  <div
                    key={pet.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelectPatient(pet)}
                  >
                    {`${pet.name} - ${pet.clientName || 'Nombre no disponible'} (${pet.clientCedula})`}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Fecha de Ingreso</label>
              <input
                type="date"
                name="admission_date"
                value={formData.admission_date}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Días Estimados</label>
              <input
                type="number"
                name="estimated_days"
                value={formData.estimated_days}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Tipo de Patología</label>
              <input
                type="text"
                name="patient_type"
                value={formData.patient_type}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Tipo de Hospitalización</label>
              <input
                type="text"
                name="hospitalization_type"
                value={formData.hospitalization_type}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Pronóstico</label>
              <input
                type="text"
                name="prognosis"
                value={formData.prognosis}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Pertenencias</label>
              <input
                type="text"
                name="belongings"
                value={formData.belongings}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Observaciones</label>
              <textarea
                name="observations"
                value={formData.observations}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Dieta</label>
              <input
                type="text"
                name="diet"
                value={formData.diet}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <label className="block text-gray-700 mr-2">¿Incluir cobro del servicio?</label>
              <input
                type="checkbox"
                name="charge_service"
                checked={formData.charge_service}
                onChange={handleChange}
                className="mr-2"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {hospitalization ? 'Guardar Cambios' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterHospitalizationModal;
