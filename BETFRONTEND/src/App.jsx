import { Routes, Route, Outlet } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import { PatientProvider } from "./context/PatientContext";

import Navbar from "./components/navbar/Navbar";
import { Container } from "./components/ui";
import { ProtectedRoute } from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PatientsPage from "./pages/PatientsPage";
import PatientFormPage from "./pages/PatientFormPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

function App() {
  const { isAuth,isAdmin,isVeterinario, loading  } = useAuth();
  console.log(loading)

  if (loading) return <h1>
    Cargando ... 
    </h1>


  return (
    <>
      <Navbar />

      <Container className="py-5">
        <Routes>
          <Route
            element={
              <ProtectedRoute isAllowed={!isAuth} redirectTo="/patients" />
            }>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route
            element={<ProtectedRoute isAllowed={isAuth, isAdmin, isVeterinario} redirectTo="/login" />}
          >
            <Route
              element={
                <PatientProvider>
                  <Outlet />
                </PatientProvider>
              }
              >
              <Route path="/patients" element={<PatientsPage />} />
              <Route path="/patients/new" element={<PatientFormPage />} />
              <Route path="/patients/:id/edit" element={<PatientFormPage />} />
            </Route>

            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
