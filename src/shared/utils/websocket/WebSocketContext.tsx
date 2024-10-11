import React from "react";
import { Socket } from "socket.io-client";

interface WsProps {
  socket: Socket | null;
}

export const WebSocketContext = React.createContext<WsProps>({ socket: null });