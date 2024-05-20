import { Card, Input, Textarea, Label, Button } from "../components/ui";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePatients } from "../context/PatientContext";

function PatientFormPage() {
  const { patients, loadPatients, createPatient, updatePatient, loadPatient, errors: patientsErrors } = usePatients();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [isEditing, setIsEditing] = useState(false); // Estado para indicar si estamos editando un paciente
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setIsEditing(true);
      loadPatient(params.id).then((patient) => {
        setValue("title", patient.title);
        setValue("description", patient.description);
      });
    }
  }, []);

  useEffect(() => {
    loadPatients();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    let patient;

    if (!isEditing) {
      patient = await createPatient(data);
    } else {
      patient = await updatePatient(params.id, data);
    }

    // No se navega automáticamente
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <div className="flex flex-col items-center w-full">
        {!showForm && (
          <Button onClick={toggleForm} className="mb-4">Crear paciente</Button>
        )}
        {showForm && (
          <Card className="mb-8">
            {patientsErrors.map((error, i) => (
              <p className="text-red-500" key={i}>
                {error}
              </p>
            ))}
            <h2 className="text-3xl font-bold my-4">
              {isEditing ? "Edit patient" : "Create patient"}
            </h2>
            <form onSubmit={onSubmit}>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                autoFocus
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-red-500">Title is required</span>
              )}
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Description"
                rows={3}
                {...register("description")}
              ></Textarea>
              <Button>{isEditing ? "Edit" : "Create patient"}</Button>
            </form>
          </Card>
        )}
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-4">Patients List</h2>
          <ul>
            {patients.map((patient) => (
              <li key={patient.id}>
                <span className="font-bold">{patient.title}</span> - {patient.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PatientFormPage;
