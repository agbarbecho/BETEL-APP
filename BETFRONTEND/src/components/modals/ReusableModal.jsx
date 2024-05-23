// src/components/modals/ReusableModal.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";

const ReusableModal = ({ isOpen, onClose, title, content, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-5 rounded shadow-lg z-50 relative w-full max-w-md mx-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="mb-4">{content}</div>
        <div className="flex justify-center space-x-2 mb-4">{actions}</div>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;
