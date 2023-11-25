import React from "react";
// const socket = new WebSocket("wss://socketsbay.com/wss/v2/1/demo/");
import useSocketSubscribe from "../../util/hooks/useSocketSub";
import AnotherComponent from "./AnotherComponent";

const Message = (_props:any) => {

  const socket  = useSocketSubscribe();
  // if(socket){
  //   socket.onopen = (event)=>{
  //     console.log("connection opened");
  //   }
  // }
  // console.log(socket)
  // socket?.send(JSON.stringify({abcd:"123"}))
  

  
  return(
    <>
      <p>asdasd</p>
      <AnotherComponent/>
    </>
  )

}

export default Message;
