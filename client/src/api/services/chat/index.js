import { get, post, deleteRequest } from "../../request";

export const getRooms = () => get("/rooms", { isAuthenticated: true });

export const getRoom = (roomId) =>
  get(`/rooms/${roomId}`, { isAuthenticated: true });

export const addRoom = (room) =>
  post("/rooms", { data: { roomName: room } }, { isAuthenticated: true });

export const deleteRoom = (id) =>
  deleteRequest(`/rooms/${id}`, { isAuthenticated: true });
