// src/context/ModalContext.jsx
import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const showModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const hideModal = () => {
    setModalContent(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalContent, showModal, hideModal }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-5 rounded shadow-lg z-50">
            {modalContent}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={hideModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
