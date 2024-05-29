// src/api/users.api.js
import axios from './axios';

export const getAllUsersRequest = () => axios.get('/admin/users');

export const deleteUserRequest = (id) => axios.delete(`/admin/users/${id}`);

export const updateUserRoleRequest = (userId, roleId) => axios.put('/admin/users/roles', { userId, roleId });
