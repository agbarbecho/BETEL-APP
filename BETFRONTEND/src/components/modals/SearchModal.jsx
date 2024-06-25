// src/components/SearchModal.jsx
import React, { useState } from 'react';
import ReusableModal from './ReusableModal';
import useSearchFilter from '../hooks/useSearchFilter';

const SearchModal = ({ isOpen, onClose, onSelect, clients }) => {
  const { searchTerm, setSearchTerm, filteredData: filteredClients } = useSearchFilter(clients, ['client_name', 'cedula', 'pets']);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  const handleClientSelect = (client, pet) => {
    setSelectedClient(client);
    setSelectedPet(pet);
  };

  const handleConfirm = () => {
    if (selectedClient && selectedPet) {
      onSelect(selectedClient, selectedPet);
      onClose();
    } else {
      alert('Por favor, seleccione un paciente.');
    }
  };

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      title="Seleccionar Paciente"
      content={
        <div>
          <input
            type="text"
            placeholder="Buscar por nombre del cliente, cédula o nombre de la mascota"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
          />
          {searchTerm && (
            <div className="max-h-60 overflow-y-auto">
              {filteredClients.length > 0 ? (
                <ul>
                  {filteredClients.map(client => (
                    client.pets.map(pet => (
                      <li
                        key={`${client.id}-${pet.id}`}
                        className={`mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded flex justify-between items-center ${
                          selectedPet && selectedPet.id === pet.id ? 'bg-gray-300' : ''
                        }`}
                        onClick={() => handleClientSelect(client, pet)}
                      >
                        <span className="truncate">{`${pet.name} - ${client.client_name} (${client.cedula})`}</span>
                      </li>
                    ))
                  ))}
                </ul>
              ) : (
                <p>No se encontraron resultados.</p>
              )}
            </div>
          )}
        </div>
      }
      actions={
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleConfirm}>
          Confirmar
        </button>
      }
    />
  );
};

export default SearchModal;
