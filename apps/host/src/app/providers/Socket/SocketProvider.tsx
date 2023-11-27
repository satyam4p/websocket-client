
import React,{ useEffect, useRef, useState } from "react";
import { SocketContext } from './SocketContext';
import socketIOClient, { Socket } from 'socket.io-client';


interface Props{
  children: React.ReactNode;
}

const SocketProvider:React.FC<Props> = ({children})=>{
  /** we use ref for the socket instance so that it won't be updated frequesntly */
  /**also we can use any library to instantiate and pass in the ref */
  const [lastMessage, setLastMessage] = useState('');
  const socket = useRef<Socket>(socketIOClient("http://localhost:3000",{
    path:"/websocket",
    autoConnect: true,
    query: {
      name: "test"+Math.random().toString(),
    }
  }));
  // new WebSocket("wss://socketsbay.com/wss/v2/1/demo/")
  useEffect(()=>{
    console.log("tryingggg")
    socket.current.on('connect',()=>{
      console.log('SocketIO: Connected and authenticated');
    })

    socket.current.on('error', (msg: string) => {
      console.error('SocketIO: Error', msg);
    });

    console.log("socket::",socket?.current?.id);
    socket.current?.on("notification",(notification)=>{
      console.log(notification);
    })
    socket.current?.on('sendMessage',(message)=>{
      setLastMessage(message);
    })



    // return ()=>{
    //   if(socket && socket.current){
    //     socket.current.removeAllListeners();
    //     socket.current.close();
    //   }
    // };
  },[])

  // socket.current?.on('connect',() => {
  //   console.log("connected");
  //   console.log("socket id:: ",socket.current?.id)
  // })
  // socket.current.on('message',(value)=>{
  //   console.log("value::",value)
  //   socket.current.send('value')
  // })
  
  return (
    <SocketContext.Provider value={{socket: socket.current, lastMessage: lastMessage}}>{children}</SocketContext.Provider>
  )

}

export default SocketProvider;