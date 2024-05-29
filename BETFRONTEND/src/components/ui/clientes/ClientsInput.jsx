// src/components/ui/clients/ClientsInput.jsx
import React from 'react';

const ClientsInput = ({ label, placeholder, name, value, onChange, icon }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="flex items-center border rounded px-3 py-2">
        {icon && <span className="mr-2">{icon}</span>}
        <input
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
        />
      </div>
    </div>
  );
};

export default ClientsInput;
