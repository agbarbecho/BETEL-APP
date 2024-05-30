import React, { createContext, useContext, useState, useCallback } from 'react';
import { getAllPatientsRequest, createPatientRequest, deletePatientRequest } from '../api/patients.api';

const PatientContext = createContext();

export const usePatients = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = useCallback(async () => {
    try {
      const response = await getAllPatientsRequest();
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }, []);

  const addPatient = useCallback(async (patient) => {
    try {
      const response = await createPatientRequest(patient);
      setPatients((prevPatients) => [...prevPatients, response.data]);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  }, []);

  const deletePatient = useCallback(async (id) => {
    try {
      await deletePatientRequest(id);
      setPatients((prevPatients) => prevPatients.filter(patient => patient.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  }, []);

  return (
    <PatientContext.Provider value={{ patients, fetchPatients, addPatient, deletePatient }}>
      {children}
    </PatientContext.Provider>
  );
};
