import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserMd,
  FaUserShield,
  FaDog,
  FaChevronDown,
  FaChevronUp,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import AccesoDenegadoModal from "../modals/AccesoDenegadoModal"; // Importa el componente del modal

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [isClientsMenuOpen, setIsClientsMenuOpen] = useState(false);

  const handleAdminClick = (e) => {
    if (user.role_id === 2) {
      // Asumiendo que role_id 2 es para VETERINARIO
      e.preventDefault();
      setShowAccessDenied(true);
      setTimeout(() => setShowAccessDenied(false), 3000);
    } else {
      navigate("/admin");
    }
  };

  const toggleClientsMenu = () => {
    setIsClientsMenuOpen(!isClientsMenuOpen);
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
          <button
            onClick={toggleClientsMenu}
            className="flex items-center text-lg w-full focus:outline-none"
          >
            <FaUserMd className="mr-4 text-2xl" /> Clientes
            {isClientsMenuOpen ? (
              <FaChevronUp className="ml-auto text-2xl" />
            ) : (
              <FaChevronDown className="ml-auto text-2xl" />
            )}
          </button>
          {isClientsMenuOpen && (
            <ul className="ml-8 mt-2">
              <li className="mb-4">
                <Link to="/veterinario/clients" className="flex items-center text-lg">
                  <FaUser className="mr-4 text-2xl" /> Clientes
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/clients/pets" className="flex items-center text-lg">
                  <FaDog className="mr-4 text-2xl" /> Mascotas
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/clients/list" className="flex items-center text-lg">
                  <FaUserMd className="mr-4 text-2xl" /> Lista de Clientes
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="mb-8">
          <Link
            to="/admin"
            className="flex items-center text-lg"
            onClick={handleAdminClick}
          >
            <FaUserShield className="mr-4 text-2xl" /> Administración
          </Link>
        </li>
      </ul>
      {showAccessDenied && <AccesoDenegadoModal />}
    </div>
  );
};

export default Sidebar;
