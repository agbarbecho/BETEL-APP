// PetsPage.jsx
import React, { useState } from 'react';
import PetsModal from '../components/modals/PetsModal';
import PetsForm from './PetsForm';

const PetsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Registrar mascota
      </button>

      <PetsModal isOpen={isModalOpen} onClose={closeModal}>
        <PetsForm />
      </PetsModal>
    </div>
  );
};

export default PetsPage;




