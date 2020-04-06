import { get } from "../../request";

export const getRooms = () => get("/rooms", { isAuthenticated: true });
