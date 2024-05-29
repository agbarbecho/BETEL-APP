// src/pages/CreatePetPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClientRequest } from '../api/clients.api';
import { getAllPatientsRequest, createPatientRequest } from '../api/patients.api';

const CreatePetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: '',
    breed: '',
    species: '',
    weight: '',
    client_id: id,
  });

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await getClientRequest(id);
        setClient(response.data);
      } catch (error) {
        console.error('Error fetching client:', error);
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await getAllPatientsRequest();
        const clientPatients = response.data.filter(patient => patient.client_id === parseInt(id));
        setPatients(clientPatients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchClient();
    fetchPatients();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPatientRequest(form);
      navigate(`/veterinario/clients/${id}/patients`);
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-4">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">INFORMACIÓN PERSONAL</h2>
            <p><strong>Nombre:</strong> {client.full_name}</p>
            <p><strong>Cédula:</strong> {client.cedula}</p>
            <p><strong>Celular:</strong> {client.phone}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Dirección:</strong> {client.address}</p>
            <p><strong>Fecha de Creación:</strong> {new Date(client.created_at).toLocaleDateString()}</p>
            <div className="flex mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2">Editar</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Eliminar</button>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 p-4">
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-2xl font-bold mb-4">Pacientes</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Raza
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Especie
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Peso
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Fecha de Creación
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {patient.name}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {patient.breed}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {patient.species}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {patient.weight} kg
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {new Date(patient.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Crear Nueva Mascota</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="breed">
                  Raza
                </label>
                <input
                  type="text"
                  name="breed"
                  id="breed"
                  value={form.breed}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="species">
                  Especie
                </label>
                <input
                  type="text"
                  name="species"
                  id="species"
                  value={form.species}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                  Peso
                </label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  value={form.weight}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Crear Mascota
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePetPage;