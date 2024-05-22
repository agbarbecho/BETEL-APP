import { Link, useLocation } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./navigation";
import { Container } from "../ui";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const { isAuth, signout } = useAuth();

  //PARA VALIDAR LAS RUTAS CUANDO EL USUARIO ESTA LOGUEADO O NO
  return (
    <nav className="bg-zinc-950 ">
      <Container className="flex justify-between py-3">
        <h1 className="font-bold text-2xl">BE-TEL</h1>

        <ul className="flex gap-x-2">
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
              <li
                onClick={() => {
                  signout();
                }}
              >
                Logout
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