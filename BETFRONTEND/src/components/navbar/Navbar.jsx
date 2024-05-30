import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { privateRoutes } from "./navigation";
import { Container } from "../ui";
import { useAuth } from "../../context/AuthContext";

function Navbar({ toggleSidebar }) {
  const location = useLocation();
  const { isAuth, signout, user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignout = async () => {
    await signout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  if (!isAuth) {
    return null; // No renderizar Navbar si no está autenticado
  }

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-cyan-600 z-50"> {/* Cambiado a cian */}
      <Container className="flex justify-between items-center px-4 py-3 relative">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4 z-50">
            <FaBars className="text-white text-2xl" />
          </button>
          <h1 className="font-bold text-2xl text-white">BE-TEL</h1>
        </div>
        <ul className="flex items-center gap-x-2 ml-auto">
          {privateRoutes.map(({ path, name }) => (
            <li
              className={`text-slate-300 ${
                location.pathname === path && "bg-sky-500 px-3 py-1"
              }`}
              key={path}
            >
              <Link to={path}>{name}</Link>
            </li>
          ))}
          <li className="relative flex items-center">
            <img
              src="https://avatars.githubusercontent.com/u/61786976?v=4"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-white ml-2">{user.name}</span>
            <div className="relative">
              <FaChevronDown
                className="w-5 h-5 text-white cursor-pointer ml-2"
                onClick={toggleMenu}
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 animate-fade-in-down">
                  <ul>
                    <li className="border-b border-gray-200 flex items-center">
                      <FaUserCircle className="ml-2 mr-2 text-gray-700" />
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex-grow"
                      >
                        Mi Perfil
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <FaSignOutAlt className="ml-2 mr-2 text-gray-700" />
                      <button
                        onClick={handleSignout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex-grow"
                      >
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
