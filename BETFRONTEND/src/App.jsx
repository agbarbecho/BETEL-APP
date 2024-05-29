import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ClientsProvider } from './context/ClientsContext';
import { UserProvider } from './context/UserContext';
import { ModalProvider } from './context/ModalContext';

import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import { Container } from './components/ui/Container';
import { ProtectedRoute } from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClientsPage from './pages/ClientsPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import NotFound from './pages/NotFound';
import ClientsListPage from './pages/ClientsListPage';
import CreatePetPage from './pages/CreatePetPage'; // Importa la nueva página

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
                <Route element={<ClientsProvider><Outlet /></ClientsProvider>}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/veterinario/clients" element={<ClientsPage />} />
                  <Route path="/veterinario/clients/:id/patients" element={<CreatePetPage />} /> {/* Cambia la ruta aquí */}
                </Route>
                <Route path="/profile" element={<ProfilePage />} />

                <Route element={<ProtectedRoute isAllowed={user?.role_id === 1} redirectTo="/home" />}>
                  <Route element={<UserProvider><Outlet /></UserProvider>}>
                    <Route path="/admin" element={<AdminPage />} />
                  </Route>
                </Route>

                <Route path="/clients/list" element={<ClientsListPage />} /> {/* Nueva ruta */}
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
