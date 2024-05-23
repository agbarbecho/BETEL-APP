import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { ConsultorioProvider } from "./context/ConsultorioContext";
import { UserProvider } from "./context/UserContext";
import { ModalProvider } from "./context/ModalContext";

import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { Container } from "./components/ui/Container";
import { ProtectedRoute } from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConsultorioPage from "./pages/ConsultorioPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

function App() {
  const { isAuth, loading, user } = useAuth();

  if (loading) return <h1>Cargando ...</h1>;

  return (
    <ModalProvider>
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
                <Route element={<ConsultorioProvider><Outlet /></ConsultorioProvider>}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/veterinario/patients" element={<ConsultorioPage />} />
                </Route>
                <Route path="/profile" element={<ProfilePage />} />

                <Route element={<ProtectedRoute isAllowed={user?.role_id === 1} redirectTo="/home" />}>
                  <Route element={<UserProvider><Outlet /></UserProvider>}>
                    <Route path="/admin" element={<AdminPage />} />
                  </Route>
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </div>
      </div>
    </ModalProvider>
  );
}

export default App;
