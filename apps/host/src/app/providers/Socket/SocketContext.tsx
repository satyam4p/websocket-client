import { createContext } from "react";
// import WebSocket from "ws";
import socketIOClient, { Socket } from 'socket.io-client';

interface ISocket{
  socket: Socket | null | undefined;
  lastMessage: string | null | undefined;
}

export const SocketContext = createContext<ISocket>({socket:null, lastMessage:null});

export default SocketContext;