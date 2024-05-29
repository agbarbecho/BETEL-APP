// PetsForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PetsForm = () => {
  const [nombre, setNombre] = useState('');
  const [genero, setGenero] = useState('');
  const [esteril, setEsteril] = useState(false);
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [edadDias, setEdadDias] = useState(0);
  const [edadMeses, setEdadMeses] = useState(0);
  const [edadAnos, setEdadAnos] = useState(0);
  const [color, setColor] = useState('');
  const [raza, setRaza] = useState('');
  const [especie, setEspecie] = useState('');
  const [club, setClub] = useState('');
  const [peso, setPeso] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/mascotas', {
        nombre, genero, esteril, fecha_nacimiento: fechaNacimiento, edad_dias: edadDias,
        edad_meses: edadMeses, edad_anos: edadAnos, color, raza, especie, club, peso
      });
      console.log('Mascota creada:', response.data);
    } catch (error) {
      console.error('Error creating mascota:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Registrar mascota - Nombre</h2>
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
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="id" className="block text-gray-700 font-bold mb-1">ID (opcional)</label>
          <input
            type="text"
            id="id"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="especie" className="block text-gray-700 font-bold mb-1">Especie</label>
          <select
            id="especie"
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
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
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genero" className="block text-gray-700 font-bold mb-1">Género</label>
          <select
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
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
            className="w-full px-3 py-2 border rounded-lg"
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
            className="w-full px-3 py-2 border rounded-lg"
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
              className="w-full px-3 py-2 border rounded-lg"
            />
            <select className="ml-2 px-3 py-2 border rounded-lg">
              <option value="kg">Kilogramos</option>
              <option value="lbs">Libras</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="talla" className="block text-gray-700 font-bold mb-1">Talla</label>
          <select
            id="talla"
            className="w-full px-3 py-2 border rounded-lg"
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
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Seleccione estado</option>
            <option value="entero">Entero</option>
            <option value="esterilizado">Esterilizado</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" className="px-4 py-2 rounded-lg border border-gray-300">Cerrar</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Guardar</button>
      </div>
    </form>
  );
};

export default PetsForm;
