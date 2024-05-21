import { createContext, useState, useContext } from "react";
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
  const [patients, setPatients] = useState([]);
  const [errors, setErrors] = useState([]);
  
  
  const loadPatients = async () => {
    const res = await getAllPatientsRequest();
    setPatients(res.data);
  };


const loadPatient = async id => {
const res = await getPatientRequest(id); 
return res.data; 
}


  const createPatient = async (patient) => {
    try {
      const res = await createPatientRequest(patient);
      setPatients([...patients, res.data]);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  //BORRAR
  const deletePatient = async (id) => {
    const res = await deletePatientRequest(id);
    if (res.status === 204) {
      setPatients(patients.filter((patient) => patient.id !== id));
    }
  };

  const updatePatient = async (id, patient) => {
    try {
      const res =  await updatePatientRequest(id, patient);
      return res.data;
    } catch (error) {
        if (error.response) {
          setErrors([error.response.data.message]);
        }
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