// src/pages/PreHospitalizacionForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHospitalizacion } from '../context/HospitalizacionContext';

const PreHospitalizacionForm = ({ onClose, onRegisterSuccess, selectedPatientId }) => {
  const [admissionDate, setAdmissionDate] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const [patientType, setPatientType] = useState('');
  const [hospitalizationType, setHospitalizationType] = useState('');
  const [prognosis, setPrognosis] = useState('');
  const [belongings, setBelongings] = useState('');
  const [observations, setObservations] = useState('');
  const [diet, setDiet] = useState('');
  const [chargeService, setChargeService] = useState(false);

  const navigate = useNavigate();
  const { addHospitalization } = useHospitalizacion();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedPatientId) {
      alert('No se ha seleccionado un paciente.');
      return;
    }
    const data = {
      patient_id: selectedPatientId,
      admission_date: admissionDate,
      estimated_days: parseInt(estimatedDays, 10),
      patient_type: patientType,
      hospitalization_type: hospitalizationType,
      prognosis,
      belongings,
      observations,
      diet,
      charge_service: chargeService,
    };
    await addHospitalization(data); // Almacena los datos en el contexto
    onRegisterSuccess(); // Llama a la función de éxito
    onClose(); // Cierra el modal
    navigate('/veterinario/hospitalizations'); // Redirige a la página de hospitalizaciones
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha de Ingreso</label>
        <input 
          type="datetime-local" 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={admissionDate}
          onChange={(e) => setAdmissionDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Días (estimados) a Hospitalizar</label>
        <input 
          type="number" 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={estimatedDays}
          onChange={(e) => setEstimatedDays(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo Paciente</label>
        <div className="mt-2 space-y-2">
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="patientType" 
              className="form-radio" 
              value="Infeccioso" 
              checked={patientType === 'Infeccioso'}
              onChange={() => setPatientType('Infeccioso')}
            />
            <span className="ml-2">Infeccioso</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="patientType" 
              className="form-radio" 
              value="No Infeccioso" 
              checked={patientType === 'No Infeccioso'}
              onChange={() => setPatientType('No Infeccioso')}
            />
            <span className="ml-2">No Infeccioso</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="patientType" 
              className="form-radio" 
              value="Post Quirúrgico" 
              checked={patientType === 'Post Quirúrgico'}
              onChange={() => setPatientType('Post Quirúrgico')}
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
              name="hospitalizationType" 
              className="form-radio" 
              value="Cuidados Intensivos" 
              checked={hospitalizationType === 'Cuidados Intensivos'}
              onChange={() => setHospitalizationType('Cuidados Intensivos')}
            />
            <span className="ml-2">Cuidados Intensivos</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="hospitalizationType" 
              className="form-radio" 
              value="Normal" 
              checked={hospitalizationType === 'Normal'}
              onChange={() => setHospitalizationType('Normal')}
            />
            <span className="ml-2">Normal</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Pronóstico</label>
        <textarea 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={prognosis}
          onChange={(e) => setPrognosis(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Pertenencias</label>
        <textarea 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={belongings}
          onChange={(e) => setBelongings(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Observaciones</label>
        <textarea 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Dieta del paciente</label>
        <textarea 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">¿Incluir cobro del servicio?</label>
        <div className="mt-2 space-y-2">
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="chargeService" 
              className="form-radio" 
              value={true} 
              checked={chargeService === true}
              onChange={() => setChargeService(true)}
            />
            <span className="ml-2">Sí</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="chargeService" 
              className="form-radio" 
              value={false} 
              checked={chargeService === false}
              onChange={() => setChargeService(false)}
            />
            <span className="ml-2">No</span>
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
