import React, { useState, useContext, useEffect, useRef } from "react";
import useAuth from "../../util/hooks/useAuth";
// const socket = new WebSocket("wss://socketsbay.com/wss/v2/1/demo/");
import useSocketSubscribe from "../../util/hooks/useSocketSub";
import './style.scss';

const Message = (_props:any) => {
  let socket = useSocketSubscribe();
  let [message, setMessage] = useState<string>('');
  let [file, setFile] = useState(null);
  let [error, setError] = useState(false);
  let messageRef = useRef<HTMLDivElement>(null);
  let [userList, setUserList] = useState<{
    name:string,
    userId: string | null | undefined
  }[]>();
  let [messages, setMessages] = useState<{
    message: string,
    type: string
  }[]>([]);
  let {currentUser} = useAuth();
  console.log("currentUSer:: ",currentUser);
  const SendMessage:React.FormEventHandler<HTMLFormElement> | undefined  = async (e)=>{
    e.preventDefault();
    if(socket?.sendJsonMessage){
      let newMessage = {
        "message": message,
        "type": "user"
      }
      console.log("readyState:: ",socket?.readyState);
      if(socket?.readyState == 1){
        // setMessages(prev=>[...prev, newMessage])
        // socket?.sendJsonMessage(newMessage,);
        let body:FormData = new FormData();
        body.append("message",message);
        let to = userList?.filter(user=>currentUser?.userId != user.userId)[0];
        console.log(to);
        let toUserId = to?.userId as string;
        body.append("userId",toUserId)
        const result = await fetch("https://3b48-111-92-126-193.ngrok-free.app/chats/broadcast",{
          method:"POST",
          body: body
        })
        setMessage('')
      }else{
        setError(true)
      }
    }
  }
  useEffect(()=>{
    let userlist = fetch("https://3b48-111-92-126-193.ngrok-free.app/chats/users_list",{
      method:"GET"
    }).then(res=>res.json()).then(result=>{
      console.log("result in messages:: ",result);
      setUserList(result);
    })
  },[])

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

  useEffect(()=>{

   if(messages && messages.length){
    messageRef.current?.scrollIntoView({
      behavior:'smooth',
      block:'end'
    })
   }

  },[messages.length])

  const handleChangee:React.ChangeEventHandler<HTMLInputElement> | undefined = (e)=>{

    // console.log(e.target.value)
    // if(socket?.sendMessage){
    //   socket?.sendMessage('typing')
    // }
    
    setMessage(e.target.value)

  }


  return(
    <div className="messageContainer">
      <div className="chat-container">
        {messages && messages.map((message, index)=>{
          if(message.type == "user"){
            return(
              <div className="message sent" key={index}><span className="identifier sent">Sent: </span> <span>{message.message}</span></div>
            )
          }
          return(
            <div className="message received" key={index}><span className="identifier received">Received: </span> <span>{message.message}</span></div>
          )
        })}
        { error 
          && (<div>
            connection closed
          </div>)
          }
          <div ref={messageRef}></div>
      </div>
      <footer className="input-action-container">
        <form onSubmit={SendMessage}>
        <input value={message} placeholder="Type Message" onChange={handleChangee}/>
        <button type="submit">Send</button><br/>
        </form>
      </footer>
      {/* <div className="input-style">
        <input onChange={handleUpload} type={'file'}/>
      </div> */}
     
      
    </div>
  )

}

export default Message;
