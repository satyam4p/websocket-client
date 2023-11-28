import React, { useEffect, useState } from "react";
// const socket = new WebSocket("wss://socketsbay.com/wss/v2/1/demo/");
import useSocketSubscribe from "../../util/hooks/useSocketSub";

const style = {
  border:'0.1em solid grey',
  borderRadius:'0.2em',
  padding:'0.5em',
  marginBottom:'0.5em',
  maxWidth:'30%',
  display:'flex',
  FlexDirection:'row',
  justifyContent:'space-between'
}


const Message = (_props:any) => {
  const [value, setValue] = useState('');
  const {socket, lastMessage} = useSocketSubscribe();
  // const [messages, setMessages] = useState([]);
  let [messages, setMessages] = useState<{
    message: string,
    type: string,
    delivered: boolean
  }[]>([]);

  const handleSend = ()=>{
    console.log("socket id in messages:: ",socket?.id);

    socket?.emit('message',value, ()=>{
      console.log("message was delivered");
      let message = {
        type: "SENT",
        message:value,
        delivered: true,
        received: false
      }
      setMessages(prev=>[...prev, message])
    });

  }


  useEffect(()=>{
    if(lastMessage){
      let message = {
        type: "RECEIVED",
        message: lastMessage,
        delivered: false,
        recieved: true
      }
      setMessages(prev=>[...prev, message])
    }
  },[lastMessage])

  return(
    <>
      <input value={value} onChange = {e=>setValue(e.target.value)}/>
      <button onClick={handleSend}>send</button>
      <hr/>
      {(messages && messages.length > 0) && (
        messages.map((message, index)=>{
          return (
            <div key={index} style={style}>
              <div className="message-container" key={index}><span>{message.type}: </span>{message.message}</div>
              <span style={{color:'blue'}}>{message.delivered && message.type == "SENT" ? "sent" : ''}</span>
            </div>
          )
        })
      )}
    </>
  )

}

export default Message;
