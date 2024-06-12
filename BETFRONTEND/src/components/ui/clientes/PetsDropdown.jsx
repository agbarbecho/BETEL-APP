import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const PetsDropdown = ({ pets }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-blue-500 hover:underline flex items-center"
      >
        {pets[0].pet_name}
        {pets.length > 1 && (
          <span className="ml-2">
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        )}
      </button>
      {isOpen && pets.length > 1 && (
        <ul className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
          {pets.slice(1).map((pet, index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-100">
              {pet.pet_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PetsDropdown;
