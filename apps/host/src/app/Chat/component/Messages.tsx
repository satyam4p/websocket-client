import React, { useEffect, useState } from "react";
// const socket = new WebSocket("wss://socketsbay.com/wss/v2/1/demo/");
import useSocketSubscribe from "../../util/hooks/useSocketSub";

const Message = (_props:any) => {
  const [value, setValue] = useState('');
  const {socket, lastMessage} = useSocketSubscribe();

  const handleSend = ()=>{
    console.log("socket id in messages:: ",socket?.id);
    socket?.emit('message',value, ()=>{
      console.log("message was delivered");
    });

  }

  // useEffect(()=>{
  //   console.log("lastMessage:: ",lastMessage);
  // },[lastMessage])

  return(
    <>
      <input value={value} onChange = {e=>setValue(e.target.value)}/>
      <button onClick={handleSend}>send</button>
      <hr/>
      {lastMessage}
    </>
  )

}

export default Message;
