import io from "socket.io-client";
import { SERVER_URL } from "../shared/constants";

const socket = io.connect(`${SERVER_URL}`);

export default socket;
