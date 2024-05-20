import { createContext, useState, useContext } from "react";
import { useAuth } from './AuthContext'; // Importa tu contexto de autenticación
import {
  getAllPatientsRequest,
  deletePatientRequest,
  createPatientRequest,
  getPatientRequest,
  updatePatientRequest
} from "../api/patients.api";

const PatientContext = createContext();

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatients must be used within a PatientProvider");
  }
  return context;
};

export const PatientProvider = ({ children }) => {
  const { role } = useAuth(); // Obtiene el rol del contexto de autenticación
  const [patients, setPatients] = useState([]);
  const [errors, setErrors] = useState([]);

  const loadPatients = async () => {
    if (role === 'user') { // Si el rol es 'user', no hace nada
      return;
    }

    const res = await getAllPatientsRequest();
    setPatients(res.data);
  };

  const deletePatient = async (id) => {
    try {
      await deletePatientRequest(id);
      loadPatients(); // Recarga los pacientes después de eliminar uno
    } catch (error) {
      setErrors(prevErrors => [...prevErrors, error]);
    }
  };

  const createPatient = async (patientData) => {
    try {
      await createPatientRequest(patientData);
      loadPatients(); // Recarga los pacientes después de crear uno
    } catch (error) {
      setErrors(prevErrors => [...prevErrors, error]);
    }
  };

  const loadPatient = async (id) => {
    try {
      const res = await getPatientRequest(id);
      return res.data;
    } catch (error) {
      setErrors(prevErrors => [...prevErrors, error]);
    }
  };

  const updatePatient = async (id, updatedData) => {
    try {
      await updatePatientRequest(id, updatedData);
      loadPatients(); // Recarga los pacientes después de actualizar uno
    } catch (error) {
      setErrors(prevErrors => [...prevErrors, error]);
    }
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        loadPatients,
        deletePatient,
        createPatient,
        loadPatient, 
        errors,
        updatePatient
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};