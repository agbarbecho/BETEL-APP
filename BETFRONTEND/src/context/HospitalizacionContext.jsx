// src/context/HospitalizacionContext.jsx
import React, { createContext, useContext, useState } from 'react';

const HospitalizacionContext = createContext();

export const useHospitalizacion = () => useContext(HospitalizacionContext);

export const HospitalizacionProvider = ({ children }) => {
  const [hospitalizacionData, setHospitalizacionData] = useState(null);

  return (
    <HospitalizacionContext.Provider value={{ hospitalizacionData, setHospitalizacionData }}>
      {children}
    </HospitalizacionContext.Provider>
  );
};
