import React, { useState } from 'react';
import { createPatientRequest } from '../api/patients.api';

const PetsForm = ({ onClose, onRegisterSuccess, clientId }) => {
  const [nombre, setNombre] = useState('');
  const [genero, setGenero] = useState('');
  const [estadoReproductivo, setEstadoReproductivo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [color, setColor] = useState('');
  const [raza, setRaza] = useState('');
  const [especie, setEspecie] = useState('');
  const [talla, setTalla] = useState('');
  const [peso, setPeso] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const birthDateFormatted = new Date(fechaNacimiento).toISOString().split('T')[0]; // Formatear a YYYY-MM-DD
    const weightNumber = parseFloat(peso);

    const patientData = {
      name: nombre,
      breed: raza,
      species: especie,
      weight: weightNumber,
      birth_date: birthDateFormatted,
      color,
      size: talla,
      reproductive_status: estadoReproductivo,
      gender: genero, // Incluyendo género en el objeto
      client_id: parseInt(clientId, 10),
    };

    console.log('Enviando datos del paciente:', patientData);
    try {
      const response = await createPatientRequest(patientData);
      console.log('Mascota creada:', response.data);
      onRegisterSuccess();
      onClose();
    } catch (error) {
      console.error('Error creando mascota:', error.response?.data || error.message);
      setError(error.response?.data || error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl m-4 mt-16">
        <div className="border-t-4 border-cyan-500 rounded-t-lg">
          <form onSubmit={handleSubmit} className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Registrar Mascota</h2>
            {error && <div className="text-red-500 mb-4">{JSON.stringify(error)}</div>}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500">Foto</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="nombre" className="block text-gray-700 font-bold mb-1">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="id" className="block text-gray-700 font-bold mb-1">ID (opcional)</label>
                <input
                  type="text"
                  id="id"
                  className="w-full px-3 py-2 border rounded-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="especie" className="block text-gray-700 font-bold mb-1">Especie</label>
                <select
                  id="especie"
                  value={especie}
                  onChange={(e) => setEspecie(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-full"
                >
                  <option value="">Selecciona una especie</option>
                  <option value="Canina">Canina</option>
                  <option value="Felina">Felina</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="raza" className="block text-gray-700 font-bold mb-1">Raza</label>
                <input
                  type="text"
                  id="raza"
                  value={raza}
                  onChange={(e) => setRaza(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="genero" className="block text-gray-700 font-bold mb-1">Género</label>
                <select
                  id="genero"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-full"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="color" className="block text-gray-700 font-bold mb-1">Color</label>
                <input
                  type="text"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fechaNacimiento" className="block text-gray-700 font-bold mb-1">Fecha de nacimiento</label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="peso" className="block text-gray-700 font-bold mb-1">Peso</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    id="peso"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-full"
                  />
                  <select className="ml-2 px-3 py-2 border rounded-full">
                    <option value="kg">Kilogramos</option>
                    <option value="lbs">Libras</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="talla" className="block text-gray-700 font-bold mb-1">Talla</label>
                <select
                  id="talla"
                  value={talla}
                  onChange={(e) => setTalla(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-full"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="pequeño">Pequeño</option>
                  <option value="mediano">Mediano</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="estadoReproductivo" className="block text-gray-700 font-bold mb-1">Estado Reproductivo</label>
                <select
                  id="estadoReproductivo"
                  value={estadoReproductivo}
                  onChange={(e) => setEstadoReproductivo(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-full"
                >
                  <option value="">Seleccione estado</option>
                  <option value="entero">Entero</option>
                  <option value="esterilizado">Esterilizado</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-full border border-gray-300 bg-red-500 text-white">Cerrar</button>
              <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded-full">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetsForm;
