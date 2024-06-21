import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatientRequest, getClientRequest, getAllPatientsRequest } from '../api/patients.api';
import { FaPrint } from 'react-icons/fa';

const CertificadoMedicoPage = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [pet, setPet] = useState(null);
  const [owner, setOwner] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const response = await getAllPatientsRequest();
        setPatients(response.data);
      } catch (error) {
        console.error('Error al obtener los pacientes:', error);
      }
    };

    fetchAllPatients();
  }, []);

  useEffect(() => {
    if (selectedPatientId) {
      const fetchPetAndOwner = async () => {
        try {
          const petResponse = await getPatientRequest(selectedPatientId);
          setPet(petResponse.data);

          const ownerResponse = await getClientRequest(petResponse.data.client_id);
          setOwner(ownerResponse.data);
        } catch (error) {
          console.error('Error obteniendo la mascota o el propietario:', error);
        }
      };

      fetchPetAndOwner();
    }
  }, [selectedPatientId]);

  useEffect(() => {
    const results = patients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.owner && patient.owner.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPatients(results);
  }, [searchTerm, patients]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSelectPatient = (patientId) => {
    setSelectedPatientId(patientId);
    setSearchTerm('');
    setFilteredPatients([]);
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Certificado Médico</h2>
        <div className="mb-4 relative">
          <label htmlFor="patient-search" className="block text-lg font-medium text-gray-700">
            Buscar Paciente o Propietario
          </label>
          <input
            id="patient-search"
            type="text"
            placeholder="Buscar por nombre del paciente o propietario"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <ul className="absolute z-10 mt-1 max-h-60 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {filteredPatients.map((patient) => (
                <li
                  key={patient.id}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                  onClick={() => handleSelectPatient(patient.id)}
                >
                  <span className="block truncate">
                    {patient.name} - {patient.owner ? patient.owner.full_name : 'Sin propietario'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectedPatientId && !pet && !owner ? (
        <div className="text-center text-gray-500">Cargando detalles del paciente...</div>
      ) : selectedPatientId && pet && owner ? (
        <>
          <div className="text-center mb-4">
            <img
              src="https://via.placeholder.com/150" // Reemplaza con la URL de la imagen del perfil de la mascota
              alt="Perfil de la Mascota"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h2 className="text-2xl font-bold">HISTORIA CLÍNICA NO. 1</h2>
            <h3 className="text-xl">Certificado Vacunación</h3>
            <p>{formatDate(new Date())}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-bold">Datos del propietario</h3>
              <p><strong>Nombre:</strong> {owner.full_name}</p>
              <p><strong>Cédula:</strong> {owner.cedula}</p>
              <p><strong>Celular:</strong> {owner.phone}</p>
              <p><strong>Correo:</strong> <a href={`mailto:${owner.email}`} className="text-blue-500">{owner.email}</a></p>
              <p><strong>Dirección:</strong> {owner.address}</p>
            </div>
            <div>
              <h3 className="font-bold">Datos de la mascota</h3>
              <p><strong>Nombre:</strong> {pet.name}</p>
              <p><strong>Especie:</strong> {pet.species}</p>
              <p><strong>Raza:</strong> {pet.breed}</p>
              <p><strong>Edad:</strong> {formatDate(pet.birth_date)}</p>
              <p><strong>Peso:</strong> {pet.weight} kg</p>
              <p><strong>Color:</strong> {pet.color}</p>
              <p><strong>Sexo:</strong> {pet.gender}</p>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-bold">Datos de vacunación e inmunización</h3>
            <table className="min-w-full border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Fecha</th>
                  <th className="border border-gray-300 px-4 py-2">Medicamento</th>
                  <th className="border border-gray-300 px-4 py-2">Lote</th>
                  <th className="border border-gray-300 px-4 py-2">Dosis</th>
                </tr>
              </thead>
              <tbody>
                {pet.vaccinations && pet.vaccinations.map((vacuna) => (
                  <tr key={vacuna.id}>
                    <td className="border border-gray-300 px-4 py-2">{formatDate(vacuna.date)}</td>
                    <td className="border border-gray-300 px-4 py-2">{vacuna.medicine}</td>
                    <td className="border border-gray-300 px-4 py-2">{vacuna.lot}</td>
                    <td className="border border-gray-300 px-4 py-2">{vacuna.dose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-4">
            <p>El paciente examinado se encuentra en buen estado de salud y su condición le permite viajar sin restricción al no presentar ningún tipo de enfermedad infectocontagiosa. Ni está infestado con gusano barrenador del ganado bovino (Cochliomyia hominivorax).</p>
            <p>Según el examen, la mascota está libre de cualquier enfermedad transmisible, contagiosa o infecciosa. La mascota no parece estar clínicamente enferma por infestación parasitaria al momento del examen físico. Tampoco está infestada con gusano barrenador del ganado bovino (Cochliomyia hominivorax).</p>
          </div>

          <div className="mb-4 text-center">
            <p>_______________________________</p>
            <p>Veterinario</p>
            <p>Tarjeta Profesional: No registra</p>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => navigate(`/veterinario/patients/${selectedPatientId}`)}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700"
            >
              Ir al Paciente
            </button>
            <button
              onClick={handlePrint}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
            >
              <FaPrint className="mr-2" /> Imprimir
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">Seleccione un paciente para ver los detalles</div>
      )}
    </div>
  );
};

export default CertificadoMedicoPage;













