
import { error } from "console";
import React,{ MutableRefObject, useEffect, useRef } from "react";
import { SocketContext } from './SocketContext';
// import socketIOClient from 'socket.io-client';


interface Props{
  children: React.ReactNode;
}

const SocketProvider:React.FC<Props> = ({children})=>{

  /** we use ref for the socket instance so that it won't be updated frequesntly */
  /**also we can use any library to instantiate and pass in the ref */
  // const socket = useRef(socketIOClient("wss://socketsbay.com",{
  //     path:"/wss/v2/1/demo/",
  //     autoConnect: true
  //   }));
  // new WebSocket("wss://socketsbay.com/wss/v2/1/demo/")

  
  const connection = useRef<WebSocket | null>(new WebSocket("wss://socketsbay.com/wss/v2/1/demo/"));
  // let socket = new WebSocket("wss://socketsbay.com/wss/v2/1/demo/");

  useEffect(()=>{

    connection.current?.addEventListener('open',()=>{
      console.log("connected");
    })
    connection.current?.addEventListener('message',(event)=>{
      console.log("received message:: ",event.data);
    })

    return ()=>{
      console.log("conenctions:: ",connection.current)
      // connection?.current?.close();
    }

  },[])

  if(connection.current?.onclose){

    connection.current.onclose = ()=>{
      console.log("socket closed")
    }

  }

  


  
  return (
    <SocketContext.Provider value={{socket: connection.current}}>{children}</SocketContext.Provider>
  )
}

export default SocketProvider;