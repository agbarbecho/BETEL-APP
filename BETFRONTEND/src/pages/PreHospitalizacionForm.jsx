// src/pages/PreHospitalizacionForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHospitalizacion } from '../context/HospitalizacionContext';

const PreHospitalizacionForm = ({ onClose }) => {
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [diasHospitalizacion, setDiasHospitalizacion] = useState('');
  const [tipoPaciente, setTipoPaciente] = useState('');
  const [tipoHospitalizacion, setTipoHospitalizacion] = useState('');
  const [pronostico, setPronostico] = useState('');
  const [pertenencias, setPertenencias] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [dietaPaciente, setDietaPaciente] = useState('');
  const [incluirCobro, setIncluirCobro] = useState('');

  const navigate = useNavigate();
  const { setHospitalizacionData } = useHospitalizacion();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      fechaIngreso,
      diasHospitalizacion,
      tipoPaciente,
      tipoHospitalizacion,
      pronostico,
      pertenencias,
      observaciones,
      dietaPaciente,
      incluirCobro,
    };
    setHospitalizacionData(data); // Almacena los datos en el contexto
    navigate('/detalles-hospitalizacion'); // Redirige a la página de detalles de hospitalización
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha de Ingreso</label>
        <input 
          type="datetime-local" 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={fechaIngreso}
          onChange={(e) => setFechaIngreso(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Días (estimados) a Hospitalizar</label>
        <input 
          type="number" 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={diasHospitalizacion}
          onChange={(e) => setDiasHospitalizacion(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo Paciente</label>
        <div className="mt-2 space-y-2">
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="tipoPaciente" 
              className="form-radio" 
              value="infeccioso" 
              checked={tipoPaciente === 'infeccioso'}
              onChange={() => setTipoPaciente('infeccioso')}
            />
            <span className="ml-2">Infeccioso</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="tipoPaciente" 
              className="form-radio" 
              value="noInfeccioso" 
              checked={tipoPaciente === 'noInfeccioso'}
              onChange={() => setTipoPaciente('noInfeccioso')}
            />
            <span className="ml-2">No Infeccioso</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="tipoPaciente" 
              className="form-radio" 
              value="postQuirurgico" 
              checked={tipoPaciente === 'postQuirurgico'}
              onChange={() => setTipoPaciente('postQuirurgico')}
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
              name="tipoHospitalizacion" 
              className="form-radio" 
              value="cuidadosIntensivos" 
              checked={tipoHospitalizacion === 'cuidadosIntensivos'}
              onChange={() => setTipoHospitalizacion('cuidadosIntensivos')}
            />
            <span className="ml-2">Cuidados Intensivos</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="tipoHospitalizacion" 
              className="form-radio" 
              value="normal" 
              checked={tipoHospitalizacion === 'normal'}
              onChange={() => setTipoHospitalizacion('normal')}
            />
            <span className="ml-2">Normal</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Pronóstico</label>
        <textarea 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={pronostico}
          onChange={(e) => setPronostico(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Pertenencias</label>
        <textarea 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={pertenencias}
          onChange={(e) => setPertenencias(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Observaciones</label>
        <textarea 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Dieta del paciente</label>
        <textarea 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={dietaPaciente}
          onChange={(e) => setDietaPaciente(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">¿Incluir cobro del servicio?</label>
        <div className="mt-2 space-y-2">
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="cobroServicio" 
              className="form-radio" 
              value="si" 
              checked={incluirCobro === 'si'}
              onChange={() => setIncluirCobro('si')}
            />
            <span className="ml-2">Sí</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              name="cobroServicio" 
              className="form-radio" 
              value="no" 
              checked={incluirCobro === 'no'}
              onChange={() => setIncluirCobro('no')}
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
