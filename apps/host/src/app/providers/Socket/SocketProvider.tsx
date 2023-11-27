
import React,{ useEffect, useRef } from "react";
import { SocketContext } from './SocketContext';
// import socketIOClient from 'socket.io-client';
import useWebSocket,{ ReadyState } from 'react-use-websocket';
import { useWebSocketOptions } from '../../util/webSocketHelpers';

interface Props{
  children: React.ReactNode;
}

const SocketProvider:React.FC<Props> = ({children})=>{
  /** we use ref for the socket instance so that it won't be updated frequesntly */
  /**also we can use any library to instantiate and pass in the ref */
  const URL = "wss://socketsbay.com/wss/v2/1/demo/";
  const {sendJsonMessage, sendMessage, lastMessage, readyState, getWebSocket  } = useWebSocket(URL, useWebSocketOptions);
  useEffect(()=>{
    if(readyState == ReadyState.OPEN){
      console.log("we are connected");
    }else{
      console.log("not connected");
    }
  },[readyState])

  const socket = getWebSocket();
  if(socket?.onerror){
    socket.onerror = (event)=>{
      console.log("error occured for connection")
    }
  }
  
  return (
    <SocketContext.Provider value={{socket: {sendMessage, lastMessage, sendJsonMessage, getWebSocket, readyState}}}>{children}</SocketContext.Provider>
  )

}

export default SocketProvider;