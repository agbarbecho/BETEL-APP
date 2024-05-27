import React, { createContext, useContext, useState } from 'react';
import { getAllPatientsRequest, getPatientRequest, createPatientRequest, updatePatientRequest, deletePatientRequest } from '../api/patients.api';

const PatientContext = createContext();

export const usePatient = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    const response = await getAllPatientsRequest();
    setPatients(response.data);
  };

  const getPatient = async (id) => {
    const response = await getPatientRequest(id);
    return response.data;
  };

  const createPatient = async (patient) => {
    await createPatientRequest(patient);
    fetchPatients();
  };

  const updatePatient = async (id, patient) => {
    await updatePatientRequest(id, patient);
    fetchPatients();
  };

  const deletePatient = async (id) => {
    await deletePatientRequest(id);
    fetchPatients();
  };

  return (
    <PatientContext.Provider value={{ patients, fetchPatients, getPatient, createPatient, updatePatient, deletePatient }}>
      {children}
    </PatientContext.Provider>
  );
};