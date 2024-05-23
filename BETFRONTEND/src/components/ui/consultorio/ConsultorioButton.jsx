// src/components/ui/consultorio/ConsultorioButton.jsx
import React from 'react';

const ConsultorioButton = ({ text, icon }) => {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};

export default ConsultorioButton;
