import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./root";
import "./index.css";
import { HospedajeProvider } from "./context/HospedajeContext";
import { ClientsProvider } from "./context/ClientsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HospedajeProvider>
      <ClientsProvider>
        <Root />
      </ClientsProvider>
    </HospedajeProvider>
  </React.StrictMode>
);

