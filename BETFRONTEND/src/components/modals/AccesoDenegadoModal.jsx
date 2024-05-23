import React from "react";

const AccesoDenegadoModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white p-6 rounded shadow-md text-center z-50">
        <h2 className=" text-red-800 text-xl font-bold mb-4">Acceso Denegado</h2>
        <p className="text-gray-700">No tienes permisos para ingresar en administración.</p>
      </div>
    </div>
  );
};

export default AccesoDenegadoModal;
