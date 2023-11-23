
import React,{ useEffect, useRef } from "react";
import { SocketContext } from './SocketContext';
import socketIOClient from 'socket.io-client';


interface Props{
  children: React.ReactNode;
}

const SocketProvider:React.FC<Props> = ({children})=>{
  /** we use ref for the socket instance so that it won't be updated frequesntly */
  /**also we can use any library to instantiate and pass in the ref */
  const socket = useRef(socketIOClient("wss://socketsbay.com",{
      path:"/wss/v2/1/demo/",
      autoConnect: true
    }));
  // new WebSocket("wss://socketsbay.com/wss/v2/1/demo/")

  useEffect(()=>{
    console.log("tryingggg")
    socket.current.on('conenct', ()=>{
      console.log('SocketIO: Connected and authenticated');
    })

    socket.current.on('error', (msg: string) => {
      console.error('SocketIO: Error', msg);
    });

    return ()=>{
      if(socket && socket.current){
        socket.current.removeAllListeners();
        socket.current.close();
      }
    };
  },[])
  
  return (
    <SocketContext.Provider value={{socket: socket.current}}>{children}</SocketContext.Provider>
  )

}

export default SocketProvider;