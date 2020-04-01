import { get } from "../../request";

export const getCurrentUser = () =>
  get("/getCurrentUser", { isAuthenticated: true });


