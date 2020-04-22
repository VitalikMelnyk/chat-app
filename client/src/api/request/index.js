import { getAuthenticationCookies } from "../cookies";
import axios from "axios";
import { SERVER_URL } from "../../shared/constants";

const getAuthHeader = () => {
  const { accessToken } = getAuthenticationCookies();
  if (accessToken) {
    return `${accessToken}`;
  }
};

const tryAxios = async (...args) => {
  try {
    return await axios(...args);
  } catch (error) {
    throw error;
  }
};

export const request = (path, { headers, isAuthenticated, ...other } = {}) => {
  return tryAxios(`${SERVER_URL}${path}`, {
    headers: {
      "content-type": "application/json",
      authorization: isAuthenticated ? getAuthHeader() : undefined,
      ...headers,
    },
    ...other,
  });
};

export const get = (path, opts) => request(path, { method: "get", ...opts });

export const post = (path, opts) => request(path, { method: "post", ...opts });

export const deleteRequest = (path, opts) =>
  request(path, { method: "delete", ...opts });
