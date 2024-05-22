import { Routes, Route, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { PatientProvider } from "./context/PatientContext";


import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";


import { Container } from "./components/ui";
import { ProtectedRoute } from "./components/ProtectedRoute";


import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PatientsPage from "./pages/PatientsPage";

import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";



function App() {
  const { isAuth, loading } = useAuth();

  if (loading) return <h1>Cargando ...</h1>;

  return (
    <>
      <Navbar />
      <div className="flex">
        {isAuth && <Sidebar />}
        <div className="flex-grow">
          <Container className="py-5">
           
           
            <Routes>
              <Route element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/patients" />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>


              <Route element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />}>
                <Route element={<PatientProvider><Outlet /></PatientProvider>}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/veterinario/patients" element={<PatientsPage />} />
  
                </Route>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </div>
      </div>
    </>
  );
}

export default App;
