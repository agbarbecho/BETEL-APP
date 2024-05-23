// src/components/ui/consultorio/ConsultorioInput.jsx
import React from 'react';

const ConsultorioInput = ({ label, placeholder, icon }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded pl-10"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default ConsultorioInput;
