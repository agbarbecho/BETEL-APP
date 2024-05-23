// src/context/UserContext.jsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { getAllUsersRequest, deleteUserRequest, updateUserRoleRequest } from '../api/users.api';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const response = await getAllUsersRequest();
    setUsers(response.data);
  };

  const deleteUser = async (id) => {
    await deleteUserRequest(id);
    setUsers(users.filter(user => user.id !== id));
  };

  const updateUserRole = async (userId, roleId) => {
    try {
      const response = await updateUserRoleRequest(userId, roleId);
      if (response.status === 200) {
        loadUsers();
      } else {
        console.error("Failed to update role:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <UserContext.Provider value={{ users, loadUsers, deleteUser, updateUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
