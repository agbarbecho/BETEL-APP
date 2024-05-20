import { Link, useLocation } from "react-router-dom";
import { privateRoutes } from "./navigation";
import { Container } from "../ui";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const { isAuth, signout } = useAuth();

  if (!isAuth) {
    return null; 
  }

  return (
    <nav className="bg-gray-800">
      <Container className="flex justify-between py-3 items-center">
        <h1 className="font-bold text-2xl text-white">BE-TEL</h1>

        <ul className="flex gap-x-4">
          {privateRoutes.map(({ path, name }) => (
            <li
              className={`text-white hover:bg-gray-700 px-3 py-2 rounded-lg ${
                location.pathname === path && "bg-gray-700"
              }`}
              key={path}
            >
              <Link to={path}>{name}</Link>
            </li>
          ))}
          <li
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-lg cursor-pointer"
            onClick={() => {
              signout();
            }}
          >
            Logout
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
