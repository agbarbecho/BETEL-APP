// src/components/ui/consultorio/ConsultorioLabel.jsx
import React from 'react';

const ConsultorioLabel = ({ htmlFor, children, className }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-gray-700 font-bold mb-2 ${className}`}>
      {children}
    </label>
  );
};

export default ConsultorioLabel;
