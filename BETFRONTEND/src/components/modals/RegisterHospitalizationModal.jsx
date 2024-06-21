import React, { useState, useEffect } from 'react';
import { useHospitalizacion } from '../../context/HospitalizacionContext';
import { useClients } from '../../context/ClientsContext';

const RegisterHospitalizationModal = ({ isOpen, onClose, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    patient_id: '',
    admission_date: '',
    estimated_days: '',
    patient_type: '',
    hospitalization_type: '',
    prognosis: '',
    belongings: '',
    observations: '',
    diet: '',
    charge_service: false,
  });

  const { addHospitalization } = useHospitalizacion();
  const { clients, fetchClients } = useClients();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchClients();
    }
  }, [isOpen, fetchClients]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = clients.flatMap(client => 
        client.pets.map(pet => ({
          ...pet,
          clientName: client.full_name,
          clientCedula: client.cedula,
        }))
      ).filter(pet =>
        `${pet.name} ${pet.clientName} ${pet.clientCedula}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients([]);
    }
  }, [searchTerm, clients]);

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
      await addHospitalization(formData);
      onRegisterSuccess();
      onClose();
    } catch (error) {
      console.error('Error al registrar la hospitalización:', error);
    }
  };

  const handleSelectPatient = (patient) => {
    setFormData((prevData) => ({
      ...prevData,
      patient_id: patient.id,
    }));
    setSearchTerm(patient.name); // Show the selected patient name in the search input
    setFilteredClients([]); // Clear the search results after selection
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-7xl">
        <h2 className="text-2xl mb-4">Registrar Hospitalización</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <label className="block text-gray-700">Buscar Paciente</label>
            <input
              type="text"
              name="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            {searchTerm && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto w-full">
                {filteredClients.map(pet => (
                  <div
                    key={pet.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelectPatient(pet)}
                  >
                    {`${pet.name} - ${pet.clientName} (${pet.clientCedula})`}
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
              <label className="block text-gray-700">Tipo de Paciente</label>
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
                required
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
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterHospitalizationModal;
