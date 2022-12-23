import {io} from "socket.io-client";
import React from "react";

const server = "http://localhost:8080"

export const socket = io(server, { transports : ['websocket'] });
export const SocketContext = React.createContext(socket);
