import { Card, Button } from "../ui";
import { usePatients } from "../../context/PatientContext";
import { useNavigate } from "react-router-dom";

function PatientCard({ patient }) {
  const { deletePatient } = usePatients();
  const navigate = useNavigate();

  return (
    <Card key={patient.id} className="py-4 px-7">
      <div>
        <h1 className="text-2xl font-bold">{patient.name}</h1>
        <p>Raza: {patient.breed}</p>
        <p>Especie: {patient.species}</p>
        <p>Peso: {patient.weight}</p>
      </div>
      <div className="my-2 flex justify-end gap-x-2">
        <Button onClick={() => navigate(`/patients/${patient.id}/edit`)}>
          Editar
        </Button>
        <Button
          onClick={async () => {
            if (window.confirm("¿Estás seguro de eliminar este paciente?")) {
              deletePatient(patient.id);
            }
          }}
        >
          Eliminar
        </Button>
      </div>
    </Card>
  );
}

export default PatientCard;