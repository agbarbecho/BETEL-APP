import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useHospedaje } from '../../context/HospedajeContext';
import { useClients } from '../../context/ClientsContext';

Modal.setAppElement('#root'); // Esto es importante para accesibilidad

const RegisterHospedajeModal = ({ isOpen, onClose }) => {
  const { addHospedaje } = useHospedaje();
  const { clients, fetchClients } = useClients();

  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedPet, setSelectedPet] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cost, setCost] = useState('');
  const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  useEffect(() => {
    console.log('Clients:', clients); // Verifica los datos obtenidos
    if (searchTerm) {
      const results = clients.filter(client => {
        console.log('Client:', client);
        return client.client_name && client.client_name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      console.log('Filtered Results:', results); // Verifica los resultados filtrados
      setFilteredClients(results);
    } else {
      setFilteredClients([]);
    }
  }, [searchTerm, clients]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hospedaje = {
      patient_id: selectedPet,
      start_date: startDate,
      end_date: endDate,
      cost: cost,
      notes: notes,
    };
    addHospedaje(hospedaje);
    onClose();
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client.client_id);
    setFilteredClients([]);
    setSearchTerm(client.client_name);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Registrar Hospedaje"
      style={{
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 5px 15px rgba(0,0,0,.5)'
        },
        overlay: {
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }
      }}
    >
      <h2 style={{ marginBottom: '20px', fontSize: '1.5em' }}>Registrar Hospedaje</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
          Cliente:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar cliente"
            style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {filteredClients.length > 0 && (
            <ul style={{ listStyle: 'none', padding: '0', margin: '0', border: '1px solid #ccc', borderRadius: '4px', maxHeight: '150px', overflowY: 'auto' }}>
              {filteredClients.map(client => (
                <li key={client.client_id} onClick={() => handleClientSelect(client)} style={{ padding: '8px', cursor: 'pointer' }}>
                  {client.client_name}
                </li>
              ))}
            </ul>
          )}
        </label>
        <label>
          Mascota:
          <select value={selectedPet} onChange={(e) => setSelectedPet(e.target.value)} disabled={!selectedClient} style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="">Seleccione una mascota</option>
            {selectedClient && clients.find(client => client.client_id === selectedClient).pets.map(pet => (
              <option key={pet.pet_id} value={pet.pet_id}>
                {pet.pet_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Fecha de Ingreso:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </label>
        <label>
          Fecha de Retiro:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </label>
        <label>
          Costo:
          <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </label>
        <label>
          Notas:
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
        </label>
        <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '4px' }}>Registrar</button>
      </form>
    </Modal>
  );
};

export default RegisterHospedajeModal;









