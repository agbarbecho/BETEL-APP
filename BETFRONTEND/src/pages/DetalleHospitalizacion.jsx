// src/components/HospitalizationForm.js
import React, { useState } from 'react';
import { useHospitalizacion } from '../context/HospitalizacionContext';

const HospitalizationForm = ({ onClose }) => {
  const { addHospitalization } = useHospitalizacion();
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addHospitalization(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label className="block text-gray-700">Fecha de Ingreso:</label>
        <input type="date" name="admission_date" value={formData.admission_date} onChange={handleChange} className="border rounded p-2 w-full" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Días (estimados) a Hospitalizar:</label>
        <input type="number" name="estimated_days" value={formData.estimated_days} onChange={handleChange} className="border rounded p-2 w-full" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tipo Paciente:</label>
        <div>
          <label className="inline-flex items-center">
            <input type="radio" name="patient_type" value="Infeccioso" checked={formData.patient_type === 'Infeccioso'} onChange={handleChange} />
            <span className="ml-2">Infeccioso</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input type="radio" name="patient_type" value="No Infeccioso" checked={formData.patient_type === 'No Infeccioso'} onChange={handleChange} />
            <span className="ml-2">No Infeccioso</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input type="radio" name="patient_type" value="Post Quirúrgico" checked={formData.patient_type === 'Post Quirúrgico'} onChange={handleChange} />
            <span className="ml-2">Post Quirúrgico</span>
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tipo Hospitalización:</label>
        <div>
          <label className="inline-flex items-center">
            <input type="radio" name="hospitalization_type" value="Cuidados Intensivos" checked={formData.hospitalization_type === 'Cuidados Intensivos'} onChange={handleChange} />
            <span className="ml-2">Cuidados Intensivos</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input type="radio" name="hospitalization_type" value="Normal" checked={formData.hospitalization_type === 'Normal'} onChange={handleChange} />
            <span className="ml-2">Normal</span>
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Pronóstico:</label>
        <input type="text" name="prognosis" value={formData.prognosis} onChange={handleChange} className="border rounded p-2 w-full" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Pertenencias:</label>
        <input type="text" name="belongings" value={formData.belongings} onChange={handleChange} className="border rounded p-2 w-full" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Observaciones:</label>
        <textarea name="observations" value={formData.observations} onChange={handleChange} className="border rounded p-2 w-full"></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Dieta del Paciente:</label>
        <input type="text" name="diet" value={formData.diet} onChange={handleChange} className="border rounded p-2 w-full" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">¿Incluir cobro del servicio?</label>
        <div>
          <label className="inline-flex items-center">
            <input type="radio" name="charge_service" value={true} checked={formData.charge_service === true} onChange={handleChange} />
            <span className="ml-2">Sí</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input type="radio" name="charge_service" value={false} checked={formData.charge_service === false} onChange={handleChange} />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Cerrar</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
      </div>
    </form>
  );
};

export default HospitalizationForm;
