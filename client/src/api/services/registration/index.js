import { post } from "../../request";

export const requestRegistration = (credentials) =>
  post("/register", { data: credentials });

export const requestCheckEmail = (credentials) =>
  post("/checkExistEmailOfUser", { data: credentials });
