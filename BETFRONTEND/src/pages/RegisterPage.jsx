import { Card, Input, Button } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, errors: signupErrors } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data);
    if (user) {
      navigate("/profile");
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-900">
      <div className="flex-1 flex items-center justify-center h-full">
        <Card className="h-full w-full p-8 flex items-center justify-center shadow-2xl rounded-lg bg-gray-800">
          <div className="w-full max-w-md">
            {signupErrors &&
              signupErrors.map((err, index) => (
                <p key={index} className="bg-red-500 text-white p-2 text-center rounded">
                  {err}
                </p>
              ))}

            <h1 className="text-4xl font-bold my-10 text-center text-white">Registro de usuario</h1>

            <form onSubmit={onSubmit} className="space-y-4">
              <label htmlFor="name" className="block text-white text-sm font-semibold">Nombre</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaUser className="text-gray-400" />
                </span>
                <Input
                  placeholder="Ingrese su nombre"
                  className="bg-gray-700 text-gray-300 w-full h-12 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("name", {
                    required: "El nombre es requerido",
                  })}
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>

              <label htmlFor="lastname" className="block text-white text-sm font-semibold">Apellido</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaUser className="text-gray-400" />
                </span>
                <Input
                  placeholder="Ingrese su apellido"
                  className="bg-gray-700 text-gray-300 w-full h-12 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("lastname", {
                    required: "El Apellido es requerido",
                  })}
                />
                {errors.lastname && <p className="text-red-500">{errors.lastname.message}</p>}
              </div>

              <label htmlFor="email" className="block text-white text-sm font-semibold">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaEnvelope className="text-gray-400" />
                </span>
                <Input
                  type="email"
                  placeholder="Ingrese su email"
                  className="bg-gray-700 text-gray-300 w-full h-12 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("email", {
                    required: "El email es requerido",
                  })}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>

              <label htmlFor="password" className="block text-white text-sm font-semibold">Contraseña</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="text-gray-400" />
                </span>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  className="bg-gray-700 text-gray-300 w-full h-12 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password", {
                    required: "La contraseña es requerida",
                  })}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </span>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>

              <div className="flex justify-center">
                <Button className="bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 ease-in-out px-6 py-2 text-lg">Registrarse</Button>
              </div>
            </form>

            <div className="flex justify-between mt-4 text-white">
              <p>¿Ya tienes una cuenta?</p>
              <Link to="/login" className="font-bold text-blue-400 hover:text-blue-500 transition-all duration-200 ease-in-out">
                Ingresar
              </Link>
            </div>
          </div>
        </Card>
      </div>
      <div className="w-3/4 relative">
        <img
          src="https://app.okvet.co/assets/media/bg/bg-okvet.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center bg-black bg-opacity-50">
          <div>
            <h2 className="text-4xl font-bold mb-4">El mejor software veterinario</h2>
            <p className="text-lg">
              Empieza a gestionar tu veterinaria y organiza tu información para
              optimizar y automatizar los procesos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
