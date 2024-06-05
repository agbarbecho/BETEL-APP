// PreHospitalizacionModal.js
import React from 'react';

const PreHospitalizacionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Pre-Ingreso a Hospitalización</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">&times;</button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha de Ingreso</label>
            <input type="datetime-local" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Días (estimados) a Hospitalizar</label>
            <input type="number" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo Paciente</label>
            <div className="mt-2 space-y-2">
              <label className="inline-flex items-center">
                <input type="radio" name="tipoPaciente" className="form-radio" value="infeccioso" />
                <span className="ml-2">Infeccioso</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="tipoPaciente" className="form-radio" value="noInfeccioso" />
                <span className="ml-2">No Infeccioso</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="tipoPaciente" className="form-radio" value="postQuirurgico" />
                <span className="ml-2">Post Quirúrgico</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo Hospitalización</label>
            <div className="mt-2 space-y-2">
              <label className="inline-flex items-center">
                <input type="radio" name="tipoHospitalizacion" className="form-radio" value="cuidadosIntensivos" />
                <span className="ml-2">Cuidados Intensivos</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="tipoHospitalizacion" className="form-radio" value="normal" />
                <span className="ml-2">Normal</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pronóstico</label>
            <textarea className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pertenencias</label>
            <textarea className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Observaciones</label>
            <textarea className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Dieta del paciente</label>
            <textarea className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">¿Incluir cobro del servicio?</label>
            <div className="mt-2 space-y-2">
              <label className="inline-flex items-center">
                <input type="radio" name="cobroServicio" className="form-radio" value="si" />
                <span className="ml-2">Sí</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="cobroServicio" className="form-radio" value="no" />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded-md">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">Siguiente</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreHospitalizacionModal;

