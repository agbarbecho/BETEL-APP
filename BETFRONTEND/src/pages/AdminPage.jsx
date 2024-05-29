// src/pages/AdminPage.jsx
import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext"; 
import { FaTrash, FaEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReusableModal from "../components/modals/ReusableModal";

function AdminPage() {
  const { users, loadUsers, deleteUser, updateUserRole } = useUserContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    const sorted = [...users].sort((a, b) => a.role_id - b.role_id);
    setSortedUsers(sorted);
  }, [users]);

  const openRoleModal = (user) => {
    setSelectedUser(user);
    setIsRoleModalOpen(true);
  };

  const closeRoleModal = () => {
    setSelectedUser(null);
    setIsRoleModalOpen(false);
  };

  const handleChangeRole = (id, roleId) => {
    updateUserRole(id, roleId);
    closeRoleModal();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredUsers = sortedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginateNext = () => setCurrentPage(currentPage + 1);
  const paginatePrev = () => setCurrentPage(currentPage - 1);

  const handleUsersPerPageChange = (event) => {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handleDeleteUser = (id) => {
    deleteUser(id);
    setIsDeletedModalOpen(true);
    setTimeout(() => {
      setIsDeletedModalOpen(false);
    }, 3000);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Administración de Usuarios</h1>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex items-center mb-2 md:mb-0">
          <button
            onClick={paginatePrev}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          <select
            value={usersPerPage}
            onChange={handleUsersPerPageChange}
            className="border border-gray-300 rounded px-2 py-1 mx-2"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={100}>100</option>
          </select>
          <button
            onClick={paginateNext}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
            disabled={indexOfLastUser >= filteredUsers.length}
          >
            <FaChevronRight />
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fecha de Creación
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {user.id}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {user.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {user.email}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {user.role_id === 1 ? 'ADMIN' : user.role_id === 2 ? 'VETERINARIO' : 'USER'}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex space-x-2">
                  <button
                    onClick={() => openRoleModal(user)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
                  >
                    <FaEdit className="mr-2" /> Editar
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center"
                  >
                    <FaTrash className="mr-2" /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReusableModal
        isOpen={isRoleModalOpen}
        onClose={closeRoleModal}
        title="Cambiar Rol de Usuario"
        content={<p>Seleccione un nuevo rol para {selectedUser?.name}:</p>}
        actions={
          <>
            <button
              onClick={() => handleChangeRole(selectedUser?.id, 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
            >
              ADMIN
            </button>
            <button
              onClick={() => handleChangeRole(selectedUser?.id, 2)}
              className="bg-green-500 text-white px-4 py-2 rounded mx-2"
            >
              VETERINARIO
            </button>
            <button
              onClick={() => handleChangeRole(selectedUser?.id, 3)}
              className="bg-gray-500 text-white px-4 py-2 rounded mx-2"
            >
              USER
            </button>
          </>
        }
      />
      <ReusableModal
        isOpen={isDeletedModalOpen}
        onClose={() => setIsDeletedModalOpen(false)}
        title="Usuario Eliminado"
        content={
          <div className="text-center">
            <svg
              className="mx-auto mb-4 w-14 h-14 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-gray-700">Usuario eliminado correctamente.</p>
          </div>
        }
      />
    </div>
  );
}

export default AdminPage;
