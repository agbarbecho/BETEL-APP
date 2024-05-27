import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUserMd, FaUserShield, FaDog } from "react-icons/fa"; // Importa FaDog
import { useAuth } from "../../context/AuthContext";
import AccesoDenegadoModal from "../modals/AccesoDenegadoModal"; // Importa el componente del modal

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  const handleAdminClick = (e) => {
    if (user.role_id === 2) { // Asumiendo que role_id 2 es para VETERINARIO
      e.preventDefault();
      setShowAccessDenied(true);
      setTimeout(() => setShowAccessDenied(false), 3000);
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="bg-gray-900 text-white h-screen w-64 p-5">
      <ul>
        <li className="mb-8">
          <Link to="/home" className="flex items-center text-lg">
            <FaHome className="mr-4 text-2xl" /> Inicio
          </Link>
        </li>
        <li className="mb-8">
          <Link to="/veterinario/patients" className="flex items-center text-lg">
            <FaUserMd className="mr-4 text-2xl" /> Consultorio
          </Link>
        </li>
        <li className="mb-8">
          <Link to="/pets" className="flex items-center text-lg"> {/* Agrega el enlace para Mascotas */}
            <FaDog className="mr-4 text-2xl" /> Mascotas
          </Link>
        </li>
        <li className="mb-8">
          <Link to="/admin" className="flex items-center text-lg" onClick={handleAdminClick}>
            <FaUserShield className="mr-4 text-2xl" /> Administración
          </Link>
        </li>
      </ul>
      {showAccessDenied && <AccesoDenegadoModal />}
    </div>
  );
};

export default Sidebar;
