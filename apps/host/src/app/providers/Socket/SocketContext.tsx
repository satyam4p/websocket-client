import { createContext } from "react";
// import WebSocket from "ws";
// import socketIOClient, { Socket } from 'socket.io-client';
import useWebsocket, {ReadyState} from 'react-use-websocket';
import { SendJsonMessage, SendMessage  } from "react-use-websocket/dist/lib/types";
interface ISocket{
 socket: {
  sendMessage: SendMessage | null;
  sendJsonMessage: SendJsonMessage | null;
  lastMessage: any;
  getWebSocket: any;
  readyState: ReadyState;
  userId:string | null | undefined;
 } | null
}

export const SocketContext = createContext<ISocket>({socket: null});

export default SocketContext;