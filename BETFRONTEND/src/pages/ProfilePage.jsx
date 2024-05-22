import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const roles = {
  1: "ADMIN",
  2: "VETERINARIO",
  3: "USER"
};

function ProfilePage() {
  const { user } = useAuth();
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    if (user) {
      setRoleName(roles[user.role_id]);
    }
  }, [user]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5 text-gray-200">Perfil del Usuario</h1>
      <div className="flex">
        <div className="w-1/3 p-5">
          <img
            src="https://avatars.githubusercontent.com/u/61786976?v=4"
            alt="avatar"
            className="w-48 h-48 rounded-full mx-auto"
          />
        </div>
        <div className="w-2/3 p-5 bg-gray-800 shadow-md rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-200 font-bold mb-2">Nombre</label>
              <div className="border border-gray-600 p-2 rounded bg-gray-900 text-gray-200">{user?.name}</div>
            </div>
            <div>
              <label className="block text-gray-200 font-bold mb-2">Email</label>
              <div className="border border-gray-600 p-2 rounded bg-gray-900 text-gray-200">{user?.email}</div>
            </div>
            <div>
              <label className="block text-gray-200 font-bold mb-2">Rol</label>
              <div className="border border-gray-600 p-2 rounded bg-gray-900 text-gray-200">{roleName}</div>
            </div>
            <div>
              <label className="block text-gray-200 font-bold mb-2">Fecha de Creación</label>
              <div className="border border-gray-600 p-2 rounded bg-gray-900 text-gray-200">{new Date(user?.created_at).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
