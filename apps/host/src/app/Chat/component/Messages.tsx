import React, { useState } from "react";
// const socket = new WebSocket("wss://socketsbay.com/wss/v2/1/demo/");
import useSocketSubscribe from "../../util/hooks/useSocketSub";

const Message = (_props:any) => {
  const [value, setValue] = useState('');
  const socket = useSocketSubscribe();

  const handleSend = ()=>{
    console.log("socket id in messages:: ",socket?.id);
    socket?.emit('hello',value);
  }

  return(
    <>
      <input value={value} onChange = {e=>setValue(e.target.value)}/>
      <button onClick={handleSend}>send</button>
    </>
  )

}

export default Message;
