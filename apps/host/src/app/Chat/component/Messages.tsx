import React, { useState, useContext, useEffect } from "react";
// const socket = new WebSocket("wss://socketsbay.com/wss/v2/1/demo/");
import useSocketSubscribe from "../../util/hooks/useSocketSub";

const Message = (_props:any) => {
  let socket = useSocketSubscribe();
  let [message, setMessage] = useState<string>('');
  let [file, setFile] = useState(null);
  let [error, setError] = useState(false);
  let [messages, setMessages] = useState<{
    message: string,
    type: string
  }[]>([]);
  const SendMessage:React.MouseEventHandler<HTMLButtonElement> | undefined = (e)=>{
    e.preventDefault();
    if(socket?.sendJsonMessage){
      let newMessage = {
        "message": message,
        "type": "user"
      }
      console.log("readyState:: ",socket?.readyState);
      if(socket?.readyState == 1){

        setMessages(prev=>[...prev, newMessage])
        socket?.sendJsonMessage(newMessage,);
        setMessage('')
      }else{
        setError(true)
      }
    }
  }

  useEffect(()=>{
    if(socket?.readyState != 1){
      setError(true)
    }else{
      setError(false)
    }
  },[socket?.readyState])

  useEffect(()=>{ 
    if(socket?.lastMessage){
      let serverMessage = {
        "message": socket?.lastMessage.data,
        "type": "server"
      }
      setMessages(prev=>[...prev, serverMessage])
    }
  },[socket?.lastMessage])/** ned to use some deep compare lib to avoid addition of duplicate last message in smal change */


  const handleChangee:React.ChangeEventHandler<HTMLInputElement> | undefined = (e)=>{

    // console.log(e.target.value)
    // if(socket?.sendMessage){
    //   socket?.sendMessage('typing')
    // }
    
    setMessage(e.target.value)

  }

  const handleUpload:React.ChangeEventHandler<HTMLInputElement> | undefined = (e)=>{
    console.log(e.target.value)
  }

  return(
    <>
      <input value={message} placeholder="Type Message" onChange={handleChangee}/>
      <button onClick={SendMessage}>Send</button><br/>
      <br/>
      <div className="input-style">
        <input onChange={handleUpload} type={'file'}/>
      </div>
      <hr></hr>
      {messages && messages.map((message, index)=>{
        if(message.type == "user"){
          return(
            <p key={index}>Sent: <span>{message.message}</span></p>
          )
        }
        return(
          <p key={index}>Received: <span>{message.message}</span></p>
        )
      })}
       { error 
        && (<div>
          connection closed
        </div>)
        }
    </>
  )

}

export default Message;
