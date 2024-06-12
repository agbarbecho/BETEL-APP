// src/components/DetalleHospitalizacion.js
import React from 'react';
import { useHospitalizacion } from '../context/HospitalizacionContext';

const DetalleHospitalizacion = () => {
  const { hospitalizacionData } = useHospitalizacion();

  if (!hospitalizacionData) {
    return <div>No hay datos de hospitalización disponibles.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Detalle de Hospitalización</h2>
      <div className="grid grid-cols-2 gap-4">
        <div><strong>Fecha Estimada de Ingreso:</strong> {hospitalizacionData.fechaIngreso}</div>
        <div><strong>Días Estimados:</strong> {hospitalizacionData.diasHospitalizacion}</div>
        <div><strong>Tipo Paciente:</strong> {hospitalizacionData.tipoPaciente}</div>
        <div><strong>Tipo Hospitalización:</strong> {hospitalizacionData.tipoHospitalizacion}</div>
        <div><strong>Pronóstico:</strong> {hospitalizacionData.pronostico}</div>
        <div><strong>Pertenencias del Paciente:</strong> {hospitalizacionData.pertenencias}</div>
        <div><strong>Observaciones:</strong> {hospitalizacionData.observaciones}</div>
        <div><strong>Dieta del Paciente:</strong> {hospitalizacionData.dietaPaciente}</div>
        <div><strong>Incluir Cobro:</strong> {hospitalizacionData.incluirCobro}</div>
      </div>
    </div>
  );
};

export default DetalleHospitalizacion;
