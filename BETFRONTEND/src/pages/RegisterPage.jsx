import { Button, Card, Input, Label, Container } from "../components/ui";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, errors: signupErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data);

    if (user) {
      navigate("/profile");
    }
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-2/5 flex items-center justify-center h-full">
        <Card className="h-full w-full p-8">
          {signupErrors &&
            signupErrors.map((err) => (
              <p key={err} className="bg-red-500 text-white p-2 text-center">
                {err}
              </p>
            ))}

          <h1 className="text-4xl font-bold my-10 text-center text-white">Registro de usuario</h1>

          <form onSubmit={onSubmit} className="space-y-4">
            <label htmlFor="name" className="block text-white text-sm font-semibold">Nombre y Apellido</label>
            <Input
              placeholder="Ingrese sus nombres"
              className="bg-gray-800 text-gray-300 w-full h-12 px-4 py-2"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500">Name is required</p>
            )}

            <label htmlFor="email" className="block text-white text-sm font-semibold">Email</label>
            <Input
              type="email"
              placeholder="Ingrese su email"
              className="bg-gray-800 text-gray-300 w-full h-12 px-4 py-2"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500">Email is required</p>
            )}

            <label htmlFor="password" className="block text-white text-sm font-semibold">Contraseña</label>
            <Input
              type="password"
              placeholder="Ingrese su contraseña"
              className="bg-gray-800 text-gray-300 w-full h-12 px-4 py-2"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}

            <Button className="bg-gray-600 text-white rounded-full hover:bg-blue-600 px-6 py-2 text-lg">Registrarse</Button>

            <div className="flex justify-between m-1 text-white">
              <p>Ya tienes una cuenta?</p>
              <Link to="/login" className="font-bold text-white">
                Ingresar
              </Link>
            </div>
          </form>
        </Card>
      </div>
      <div className="w-3/5 relative">
        <img
          src="https://app.okvet.co/assets/media/bg/bg-okvet.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">El mejor software veterinario</h2>
            <p>Empieza a gestionar tu veterinaria y organiza tu información para optimizar y automatizar los procesos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
