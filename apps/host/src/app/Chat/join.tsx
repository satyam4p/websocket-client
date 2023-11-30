import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useNegotiate from "../util/hooks/useNegotiate";
import useAuth from "../util/hooks/useAuth";
import './style.scss';

const Join = ()=>{
  const navigate = useNavigate();  
  const {callnegotiate, client_url} = useNegotiate();
  const {setClientUrl, setUser} = useAuth();
  const [value, setValue] = useState('');

  const handleJoin:React.FormEventHandler<HTMLFormElement> | undefined =async (e)=>{
    e.preventDefault();
    try{
        let res = await fetch(`https://3b48-111-92-126-193.ngrok-free.app/chats/login?name=${value}`,{
        method:"GET",
      })
      let data = await res.json()
      if(data){
        console.log("res:: ",data);

        let url = await callnegotiate(data.userId);
        setUser(data);
        window.localStorage.clear();
        window.localStorage.setItem("client_url", url?.client_url);
        setClientUrl(url);
        navigate('/message',{});
      }
    }catch(error){
      console.log("error occured while fetching user:: ",error);
    }
  }
  console.log("clienadsf url:: ",client_url);
  return(
    <div className="join-container">
      <form onSubmit={handleJoin}>
        <input placeholder="Enter Name" value={value} onChange={(e)=>setValue(e.target.value)}/>
        <button type="submit">Join</button>
      </form>
    </div>
  )
}

export default Join;