import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ClientsProvider } from "./context/ClientsContext";
import { UserProvider } from "./context/UserContext";
import { ModalProvider } from "./context/ModalContext";
import { PatientProvider } from "./context/PatientContext";
import { HospitalizacionProvider } from "./context/HospitalizacionContext";
import { HospedajeProvider } from "./context/HospedajeContext";
import App from "./App";

const Root = () => (
  <Router>
    <AuthProvider>
      <ModalProvider>
        <HospitalizacionProvider>
          <PatientProvider>
            <HospedajeProvider>
              <ClientsProvider>
                <UserProvider>
                  <App />
                </UserProvider>
              </ClientsProvider>
            </HospedajeProvider>
          </PatientProvider>
        </HospitalizacionProvider>
      </ModalProvider>
    </AuthProvider>
  </Router>
);

export default Root;
