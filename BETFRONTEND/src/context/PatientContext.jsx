import React, { createContext, useContext, useState, useCallback } from 'react';
import { getAllPatientsRequest, getPatientRequest, createPatientRequest, updatePatientRequest, deletePatientRequest } from '../api/patients.api';

const PatientContext = createContext();

export const usePatients = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);

  const fetchPatients = useCallback(async () => {
    try {
      const response = await getAllPatientsRequest();
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }, []);

  const fetchPatient = useCallback(async (id) => {
    try {
      const response = await getPatientRequest(id);
      setCurrentPatient(response.data);
    } catch (error) {
      console.error('Error fetching patient:', error);
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

  const updatePatient = useCallback(async (id, patient) => {
    try {
      await updatePatientRequest(id, patient);
      setPatients((prevPatients) =>
        prevPatients.map((p) => (p.id === id ? { ...p, ...patient } : p))
      );
    } catch (error) {
      console.error('Error updating patient:', error);
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
    <PatientContext.Provider value={{ patients, currentPatient, fetchPatients, fetchPatient, addPatient, updatePatient, deletePatient }}>
      {children}
    </PatientContext.Provider>
  );
};
