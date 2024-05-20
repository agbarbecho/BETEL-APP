import { useEffect } from "react";
import { usePatients } from "../context/PatientContext";

function PatientsPage() {
  const { patients, loadPatients, deletePatient } = usePatients();

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <div className="overflow-x-auto">
      <button onClick="">crear</button>
      <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Raza
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Especie
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Peso
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="transition-all hover:bg-gray-50 hover:shadow-md"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 rounded-lg">
                {patient.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 rounded-lg">
                {patient.breed}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 rounded-lg">
                {patient.species}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 rounded-lg">
                {patient.weight}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 rounded-lg">
                <button onClick={() => deletePatient(patient.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientsPage;
