import { get } from "../../request";

export const getMessages = (roomId, limit, offset) =>
  get(`/messages/${roomId}?offset=${offset}&limit=${limit}`, {
    isAuthenticated: true,
  });
