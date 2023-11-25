import { createContext } from "react";
// import WebSocket from "ws";

interface ISocket{
  socket: WebSocket | null | undefined
}

export const SocketContext = createContext<ISocket>({socket:null});

export default SocketContext;