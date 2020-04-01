import { get, deleteRequest } from "../../request";

export const getUsers = () => get("/users", { isAuthenticated: true });

export const deleteUser = id =>
  deleteRequest(`/users/${id}`, { isAuthenticated: true });
