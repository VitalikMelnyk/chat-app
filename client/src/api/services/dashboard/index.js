import { get } from "../../request";

export const getUsers = () => get("/users", { isAuthenticated: true });
