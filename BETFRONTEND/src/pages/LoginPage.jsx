import { Card, Input, Button } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data);
    if (user) {
      navigate("/profile");
    }
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="flex-1 flex items-center justify-center h-full">
        <Card className="h-full w-full p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            {loginErrors &&
              loginErrors.map((err, index) => (
                <p key={index} className="bg-red-500 text-white p-2 text-center">
                  {err}
                </p>
              ))}

            <h1 className="text-4xl font-bold my-10 text-center text-white">Inicia Sesión</h1>

            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-white text-sm font-semibold">Email</label>
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-gray-800 text-gray-300 w-full h-12 px-4 py-2 mt-2"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-white text-sm font-semibold">Contraseña</label>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  className="bg-gray-800 text-gray-300 w-full h-12 px-4 py-2 mt-2"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>

              <Button className="bg-gray-600 text-white rounded-full hover:bg-blue-600 px-6 py-2 w-full">Iniciar sesión</Button>
            </form>

            <div className="flex justify-between mt-4 text-white">
              <p>No tienes una cuenta?</p>
              <Link to="/register" className="font-bold text-white">
                Registrate
              </Link>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex-1 relative">
        <img
          src="https://app.okvet.co/assets/media/bg/bg-okvet.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">El mejor software veterinario</h2>
            <p>
              Empieza a gestionar tu veterinaria y organiza tu información para
              optimizar y automatizar los procesos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
