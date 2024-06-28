// src/pages/PreHospitalizacionForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHospitalizacion } from '../context/HospitalizacionContext';
import { useClients } from '../context/ClientsContext';

const PreHospitalizacionForm = ({ onClose, onRegisterSuccess, selectedPatientId }) => {
  const initialFormData = {
    patient_id: selectedPatientId || '',
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

  const { addHospitalization } = useHospitalizacion();
  const { clients, fetchClients } = useClients();
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients().then(() => setClientsLoaded(true));
  }, [fetchClients]);

  useEffect(() => {
    if (clientsLoaded && selectedPatientId) {
      const selectedClient = clients.find(client =>
        client.pets.some(pet => pet.id === selectedPatientId)
      );
      const selectedPet = selectedClient ? selectedClient.pets.find(pet => pet.id === selectedPatientId) : null;
      const searchTerm = selectedPet
        ? `${selectedPet.name} - ${selectedClient.client_name} (${selectedClient.cedula})`
        : '';

      setFormData({
        ...formData,
        patient_id: selectedPatientId,
        client_id: selectedClient.client_id,
      });
      setSearchTerm(searchTerm);
    }
  }, [clientsLoaded, selectedPatientId, clients]);

  useEffect(() => {
    if (searchTerm && !selectedPatientId) {
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
  }, [searchTerm, clients, selectedPatientId]);

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

      await addHospitalization(formattedData);
      onRegisterSuccess();
      setFormData(initialFormData);
      setSearchTerm('');
      setFilteredClients([]);
      onClose();
      navigate('/veterinario/hospitalization'); 
    } catch (error) {
      console.error('Error al registrar la hospitalización:', error.response.data);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative mb-4">
        <label className="block text-gray-700">Paciente</label>
        <input
          type="text"
          name="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          readOnly={!!selectedPatientId}
        />
        {searchTerm && !selectedPatientId && (
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
          <label className="block text-sm font-medium text-gray-700">Fecha de Ingreso</label>
          <input 
            type="date" 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            name="admission_date"
            value={formData.admission_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Días (estimados) a Hospitalizar</label>
          <input 
            type="number" 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            name="estimated_days"
            value={formData.estimated_days}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo de Patología</label>
        <div className="mt-2 space-y-2">
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="patient_type" 
              className="form-radio" 
              value="Infeccioso" 
              checked={formData.patient_type === 'Infeccioso'}
              onChange={handleChange}
            />
            <span className="ml-2">Infeccioso</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="patient_type" 
              className="form-radio" 
              value="No Infeccioso" 
              checked={formData.patient_type === 'No Infeccioso'}
              onChange={handleChange}
            />
            <span className="ml-2">No Infeccioso</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="patient_type" 
              className="form-radio" 
              value="Post Quirúrgico" 
              checked={formData.patient_type === 'Post Quirúrgico'}
              onChange={handleChange}
            />
            <span className="ml-2">Post Quirúrgico</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo Hospitalización</label>
        <div className="mt-2 space-y-2">
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="hospitalization_type" 
              className="form-radio" 
              value="Cuidados Intensivos" 
              checked={formData.hospitalization_type === 'Cuidados Intensivos'}
              onChange={handleChange}
            />
            <span className="ml-2">Cuidados Intensivos</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="hospitalization_type" 
              className="form-radio" 
              value="Normal" 
              checked={formData.hospitalization_type === 'Normal'}
              onChange={handleChange}
            />
            <span className="ml-2">Normal</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Pronóstico</label>
        <textarea 
          name="prognosis"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={formData.prognosis}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Pertenencias</label>
        <textarea 
          name="belongings"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={formData.belongings}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Observaciones</label>
        <textarea 
          name="observations"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={formData.observations}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Dieta del paciente</label>
        <textarea 
          name="diet"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={formData.diet}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">¿Incluir cobro del servicio?</label>
        <div className="mt-2 space-y-2">
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              name="charge_service"
              className="form-checkbox" 
              checked={formData.charge_service}
              onChange={handleChange}
            />
            <span className="ml-2">Sí</span>
          </label>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-full border border-gray-300 bg-red-500 text-white">Cerrar</button>
        <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded-full">Guardar</button>
      </div>
    </form>
  );
};

export default PreHospitalizacionForm;
