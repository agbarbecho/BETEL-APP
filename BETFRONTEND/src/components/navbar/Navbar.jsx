import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { privateRoutes, publicRoutes } from "./navigation";
import { Container } from "../ui";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
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

  return (
    <nav className="bg-zinc-950">
      <Container className="flex justify-between items-center px-9 py-3">
        <h1 className="font-bold text-2xl text-white">BE-TEL</h1>
        
        <ul className="flex items-center gap-x-2 ml-auto">
          {isAuth ? (
            <>
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
            </>
          ) : (
            publicRoutes.map(({ path, name }) => (
              <li
                className={`text-slate-300 ${
                  location.pathname === path && "bg-sky-500 px-3 py-1"
                }`}
                key={path}
              >
                <Link to={path}>{name}</Link>
              </li>
            ))
          )}
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
