import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientRequest, getClientRequest } from '../api/patients.api';
import SearchModal from '../components/modals/SearchModal';
import { FaPrint } from 'react-icons/fa';

const CertificadoMedicoPage = () => {
  const { id } = useParams(); // `id` es el `petId`
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pet, setPet] = useState(null);
  const [owner, setOwner] = useState(null); // Estado para almacenar los detalles del propietario
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setIsModalOpen(true); // Abrir el modal automáticamente si no hay `id` de mascota
    } else {
      fetchPetAndOwner(id);
    }
  }, [id]);

  const fetchPetAndOwner = async (petId) => {
    try {
      const petResponse = await getPatientRequest(petId);
      setPet(petResponse.data);

      const ownerResponse = await getClientRequest(petResponse.data.client_id);
      setOwner(ownerResponse.data);
    } catch (error) {
      console.error('Error obteniendo la mascota o el propietario:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate('/home'); // Redirigir a la página de inicio si el modal se cierra sin seleccionar
  };

  const handleSelect = (client, pet) => {
    setIsModalOpen(false);
    navigate(`/veterinario/patients/${pet.pet_id}/certificado`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const handlePrint = () => {
    window.print();
  };

  if (isModalOpen || (!pet && !owner)) {
    return (
      <div>
        <SearchModal isOpen={isModalOpen} onClose={handleModalClose} onSelect={handleSelect} />
      </div>
    );
  }

  if (!pet || !owner) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
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
          <h3 className="font-bold">Datos de propietario | Owner data</h3>
          <p><strong>Nombre | Name:</strong> {owner.name}</p>
          <p><strong>Cédula | ID:</strong> {owner.cedula}</p>
          <p><strong>Celular | Cell Number:</strong> {owner.phone}</p>
          <p><strong>Correo | Email:</strong> <a href={`mailto:${owner.email}`} className="text-blue-500">{owner.email}</a></p>
          <p><strong>Dirección | Address:</strong> {owner.address}</p>
        </div>
        <div>
          <h3 className="font-bold">Datos de la mascota | Pet data</h3>
          <p><strong>Nombre | Name:</strong> {pet.name}</p>
          <p><strong>Especie | Species:</strong> {pet.species}</p>
          <p><strong>Raza | Breed:</strong> {pet.breed}</p>
          <p><strong>Edad | Age:</strong> {pet.age}</p>
          <p><strong>Peso | Weight:</strong> {pet.weight} kg</p>
          <p><strong>Color:</strong> {pet.color}</p>
          <p><strong>Sexo | Sex:</strong> {pet.gender}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold">Datos de vacunación e inmunización | Vaccination and immunization data</h3>
        <table className="min-w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Fecha | Date</th>
              <th className="border border-gray-300 px-4 py-2">Medicamento | Medicine</th>
              <th className="border border-gray-300 px-4 py-2">Lote | Lot</th>
              <th className="border border-gray-300 px-4 py-2">Dosis | Dosis</th>
            </tr>
          </thead>
          <tbody>
            {/* Asegúrate de reemplazar esto con los datos reales de vacunación */}
            <tr>
              <td className="border border-gray-300 px-4 py-2">2024-06-20</td>
              <td className="border border-gray-300 px-4 py-2">Vacuna XYZ</td>
              <td className="border border-gray-300 px-4 py-2">123456</td>
              <td className="border border-gray-300 px-4 py-2">1 ml</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <p>El paciente examinado se encuentra en buen estado de salud y su condición le permite viajar sin restricción al no presentar ningún tipo de enfermedad infectocontagiosa. Ni está infestado con gusano barrenador del ganado bovino (Cochliomyia hominivorax).</p>
        <p>According to the examination the pet is free of any transmissible, contagious or infectious disease, the pet does not appear to be clinically ill from parasitic infestation at the time of physical examination. Neither is infested with cattle screwworm (Cochliomyia hominivorax).</p>
      </div>

      <div className="mb-4 text-center">
        <p>_______________________________</p>
        <p>Veterinario</p>
        <p>Tarjeta Profesional: No registra</p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate(`/veterinario/patients/${id}`)}
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
    </div>
  );
};

export default CertificadoMedicoPage;

