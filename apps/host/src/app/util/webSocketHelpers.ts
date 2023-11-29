import useWebSocket,{ReadyState, SendMessage, } from "react-use-websocket"


const RECONNECT_ATTEMPTS = 10;

// interface CustomWebSocketEventMap extends WebSocketEventMap {
//   typing: TypingType
// }

// type TypingType = {
//   isTyping: boolean
// }

type useWebSocketOptionsType = {
  fromSocketIO?: boolean;
  queryParams?: { [field: string]: any };
  protocols?: string | string[];
  share?: boolean;
  onOpen?: (event: WebSocketEventMap['open']) => void;
  onClose?: (event: WebSocketEventMap['close']) => void;
  onMessage?: (event: WebSocketEventMap['message']) => void;
  onError?: (event: WebSocketEventMap['error']) => void;
  // onTyping?:(event: CustomWebSocketEventMap['typing'])=>void; /**custom event */
  onReconnectStop?: (numAttempts: number) => void;
  shouldReconnect?: (event: WebSocketEventMap['close']) => boolean;
  reconnectInterval?: number | ((lastAttemptNumber: number) => number);
  reconnectAttempts?: number;
  filter?: (message: WebSocketEventMap['message']) => boolean;
  retryOnError?: boolean;
  eventSourceOptions?: EventSourceInit;
  heartbeat?: boolean | {
    message?: "ping" | "pong" | string;
    returnMessage?: "ping" | "pong" | string;
    timeout?: number;
    interval?: number;
  };
}

export const useWebSocketOptions: useWebSocketOptionsType= {

  reconnectAttempts: RECONNECT_ATTEMPTS,
  reconnectInterval: (lastAttemptNumber)=>{
    /**the reconnect attempt number initially will be 0 then it will increase twice 
     * the last attempt untill the mx attempt number is reached */
    console.log(`trying reconnecting ${lastAttemptNumber} time`);
    if(lastAttemptNumber == RECONNECT_ATTEMPTS - 1){
      console.log("last connection attemt failed:: Switching to long polling");
    }
    return Math.min(Math.pow(2, lastAttemptNumber) * 1000, 10000) 
  },
  // protocols:[],
  shouldReconnect: (CloseEvent)=>{
    console.log("connection closed! ",CloseEvent.reason);
    return true /**if we got disconnected normally code name: CLOSE_NORMAL */
  },
  onOpen: (event)=>{
    console.log("connection open")
  },
  onMessage: (event)=>{
    console.log("received message from server:: ",event.data);
  },
  onClose: (event)=>{
    console.log("connection closed");
  },
  retryOnError: true,
  // heartbeat: {
  //   message: 'ping',
  //   returnMessage: 'pong',
  //   timeout: 600000, // 1 minute, if no response is received, the connection will be closed
  //   interval: 10000, // every 25 seconds, a ping message will be sent
  // },

}