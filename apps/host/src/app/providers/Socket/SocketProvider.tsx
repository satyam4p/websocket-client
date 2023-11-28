
import React,{ useEffect, useRef, useState, useMemo } from "react";
import { SocketContext } from './SocketContext';
import socketIOClient, { Socket } from 'socket.io-client';


interface Props{
  children: React.ReactNode;
}

const SocketProvider:React.FC<Props> = ({children})=>{
  /** we use ref for the socket instance so that it won't be updated frequesntly */
  /**also we can use any library to instantiate and pass in the ref */
  const [lastMessage, setLastMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const connection = useMemo(()=>{
    let conn = socketIOClient("http://localhost:3000",{
    path:"/websocket",
    autoConnect: true,
    query: {
      name: "test"+Math.random().toString(),
    }
  })
  conn.on('connect',()=>{
    console.log('SocketIO: Connected and authenticated');
  })

  conn.on('error', (msg: string) => {
    console.error('SocketIO: Error', msg);
  });

  console.log("socket::",conn.id);
  conn.on("notification",(notification)=>{
    console.log(notification);
  })
  conn.on('sendMessage',(message)=>{
    // console.log("lastMessage:: ",message)
    setLastMessage(message);
  })
  return conn
  },[]);
  // new WebSocket("wss://socketsbay.com/wss/v2/1/demo/")
  useEffect(()=>{
    console.log("tryingggg")
    setSocket(connection)
    


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
    <SocketContext.Provider value={{socket: connection, lastMessage: lastMessage}}>{children}</SocketContext.Provider>
  )

}

export default SocketProvider;