// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ClientsProvider } from './context/ClientsContext';
import { UserProvider } from './context/UserContext';
import { ModalProvider } from './context/ModalContext';
import { PatientProvider } from './context/PatientContext';
import { HospitalizacionProvider } from './context/HospitalizacionContext';

import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import { ProtectedRoute } from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClientsPage from './pages/ClientsPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import NotFound from './pages/NotFound';
import CreatePetPage from './pages/CreatePetPage';
import PatientsPage from './pages/PatientsPage';
import PreHospitalizacionForm from './pages/PreHospitalizacionForm';
import DetalleHospitalizacion from './pages/DetalleHospitalizacion';

const App = () => {
  const { isAuth, loading, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) return <h1>Cargando ...</h1>;

  return (
    <ModalProvider>
      <HospitalizacionProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedLayout isAuth={isAuth} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />}>
            <Route element={<ClientsProvider><Outlet /></ClientsProvider>}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/veterinario/clients" element={<ClientsPage />} />
              <Route path="/veterinario/clients/:id" element={<CreatePetPage />} />
              <Route element={<PatientProvider><Outlet /></PatientProvider>}>
                <Route path="/veterinario/patients" element={<PatientsPage />} />
              </Route>
            </Route>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/prehospitalizacion" element={<PreHospitalizacionForm />} />
            <Route path="/detalles-hospitalizacion" element={<DetalleHospitalizacion />} />

            <Route element={<ProtectedRoute isAllowed={user?.role_id === 1} redirectTo="/home" />}>
              <Route element={<UserProvider><Outlet /></UserProvider>}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </HospitalizacionProvider>
    </ModalProvider>
  );
};

const PublicLayout = () => (
  <div className="flex h-screen w-screen overflow-hidden">
    <Outlet />
  </div>
);

const ProtectedLayout = ({ isAuth, toggleSidebar, sidebarOpen }) => (
  <div className="flex h-screen overflow-hidden">
    {isAuth && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
    <div className={`flex flex-col flex-grow overflow-hidden transition-all duration-300 ${isAuth ? 'ml-64' : 'ml-0'}`}>
      {isAuth && <Navbar toggleSidebar={toggleSidebar} />}
      <div className="flex-grow overflow-y-auto p-4 pt-16">
        <Outlet />
      </div>
    </div>
  </div>
);

export default App;
