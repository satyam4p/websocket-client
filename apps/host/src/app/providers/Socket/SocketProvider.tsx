
import React,{ useEffect, useRef, useState } from "react";
import { SocketContext } from './SocketContext';
// import socketIOClient from 'socket.io-client';
import useWebSocket,{ ReadyState } from 'react-use-websocket';
import { useWebSocketOptions } from '../../util/webSocketHelpers';
import { resolve } from "node:path/win32";
import useAuth from "../../util/hooks/useAuth";

interface Props{
  children: React.ReactNode;
}
async function getClient(){
  let res = await fetch("https://3b48-111-92-126-193.ngrok-free.app/chats/negotiate",{
  method:"POST",
  headers:{
  }
})
  return await res.json();
}
// async function logMovies() {  const response = await fetch("http://example.com/movies.json");  const movies = await response.json();  console.log(movies);}

const SocketProvider:React.FC<Props> = ({children})=>{
  const {client_url}  = useAuth();
  // const [getWebSocket, setWs] = useState<any>();
  // const [sendJsonMessage, setJsonMsg] = useState<any>();
  // const [sendMessage, setSendMsg] = useState<any>();
  // const [readyState, setReadyState] = useState<any>();
  // const [lastMessage, setlstMsg] = useState<any>();
  const [clientUrl, setClient] = useState('');
  const [userId, setUser] = useState('');
  const URL = "wss://socketsbay.com/wss/v2/1/demo/";
  const {sendJsonMessage, sendMessage, lastMessage, readyState, getWebSocket  } = useWebSocket(client_url, useWebSocketOptions);
  /** we use ref for the socket instance so that it won't be updated frequesntly */
  /**also we can use any library to instantiate and pass in the ref */
  useEffect(()=>{
    let formData:FormData = new FormData();
    let userId = Math.floor(Math.random()*100).toString();
    formData.append("userId",userId)
    fetch(`https://3b48-111-92-126-193.ngrok-free.app/chats/negotiate/`,{
      method:"POST",
      body:formData,
      headers:{

      }}).then(res=>res.json()).then(res=>{
        setClient(res.client_url)
        setUser(userId)
        // setWs(getWebSocket)
        // setlstMsg(lastMessage)
        // setSendMsg(sendMessage)
        // setReadyState(readyState)
        // setJsonMsg(sendJsonMessage)
      })
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
    <SocketContext.Provider value={{socket: {sendMessage, lastMessage, sendJsonMessage, getWebSocket, readyState, userId}}}>{children}</SocketContext.Provider>
  )

}

export default SocketProvider;