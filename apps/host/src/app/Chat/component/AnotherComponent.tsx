import React, { useState } from "react";
import useSocketSubscribe from "../../util/hooks/useSocketSub";


const AnotherComponent = () => {
  const socket = useSocketSubscribe();

  if(socket){
    socket.onmessage = (event)=>{
      console.log("messagefrom the server:: ",event.data);
    }
  } 
  const [text, setText] = useState("");
  return(
    <>
    <input onChange={(e)=>setText(e.target.value)}/>
      <button onClick={(e)=>{
        socket?.send(text)
      }}>
        click
      </button>
    </>
  )

}


export default AnotherComponent;