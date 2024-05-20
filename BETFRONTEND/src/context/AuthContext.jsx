import { createContext, useState, useContext, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "../api/axios";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null); // Nuevo estado para el rol del usuario
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  const signin = async (data) => {
    try {
      const res = await axios.post("/signin", data);
      setUser(res.data);
      setRole(res.data.role); // Establece el rol del usuario
      setIsAuth(true);
      return res.data;
    } catch (error) {
      handleErrors(error);
    }
  };

  const signup = async (data) => {
    try {
      const res = await axios.post("/signup", data);
      setUser(res.data);
      setRole(res.data.role); // Establece el rol del usuario
      setIsAuth(true);
      return res.data;
    } catch (error) {
      handleErrors(error);
    }
  };

  const signout = async () => {
    try {
      await axios.post("/signout");
      setUser(null);
      setRole(null); // Limpia el rol del usuario al cerrar sesión
      setIsAuth(false);
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleErrors = (error) => {
    if (Array.isArray(error.response.data)) {
      setErrors(error.response.data);
    } else {
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (Cookie.get("token")) {
      axios
        .get("/profile")
        .then((res) => {
          setUser(res.data);
          setRole(res.data.role); // Establece el rol del usuario
          setIsAuth(true);
        })
        .catch((err) => {
          setUser(null);
          setRole(null); // Limpia el rol del usuario en caso de error
          setIsAuth(false);
        });
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    const clean = setTimeout(() => {
      setErrors(null);      
    }, 5000);

    return () => clearTimeout(clean);
  }, [errors])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        role, // Proporciona el estado del rol del usuario
        errors,
        signup,
        signin,
        signout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
