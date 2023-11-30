
import React,{ useEffect, useRef, useState } from "react";
import { SocketContext } from './SocketContext';
// import socketIOClient from 'socket.io-client';
import useWebSocket,{ ReadyState } from 'react-use-websocket';
import { useWebSocketOptions } from '../../util/webSocketHelpers';
import useAuth from "../../util/hooks/useAuth";

interface Props{
  children: React.ReactNode;
}
// async function getClient(){
//   let res = await fetch("https://3b48-111-92-126-193.ngrok-free.app/chats/negotiate",{
//   method:"POST",
//   headers:{
//   }
// })
//   return await res.json();
// }
// async function logMovies() {  const response = await fetch("http://example.com/movies.json");  const movies = await response.json();  console.log(movies);}

const SocketProvider:React.FC<Props> = ({children})=>{
  const {client_url}  = useAuth();
  let URL = client_url?.client_url as string;
  if(!URL){
    try{
      URL = window.localStorage.getItem('client_url') as string;
    }catch(error){
      console.log("url not set in storage");
    }
    
  }
  const [clientUrl, setClient] = useState('');
  // const URL = "wss://socketsbay.com/wss/v2/1/demo/";
  const {sendJsonMessage, sendMessage, lastMessage, readyState, getWebSocket  } = useWebSocket(URL, useWebSocketOptions);
  /** we use ref for the socket instance so that it won't be updated frequesntly */
  /**also we can use any library to instantiate and pass in the ref */
  useEffect(()=>{
  },[])

  useEffect( () => {
    if(readyState == ReadyState.OPEN){
      console.log("we are connected");
    }else{
      console.log("not connected");
    }
  },[readyState])

  // const socket = getWebSocket();
  // if(socket?.onerror){
  //   socket.onerror = (event)=>{
  //     console.log("error occured for connection")
  //   }
  // }
  // socket?.addEventListener('close',()=>{
  //   console.log("connection got closed")
  // })

  
  return (
    <SocketContext.Provider value={{socket: {sendMessage, lastMessage, sendJsonMessage, getWebSocket, readyState}}}>{children}</SocketContext.Provider>
  )

}

export default SocketProvider;