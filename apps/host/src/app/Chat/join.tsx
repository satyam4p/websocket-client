import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Join = ()=>{
  const navigate = useNavigate();  
  const [value, setValue] = useState();
  const handleJoin:React.FormEventHandler<HTMLFormElement> | undefined =async (e)=>{
    e.preventDefault();
    let res = await fetch(`https://3b48-111-92-126-193.ngrok-free.app/chats/login?name=${value}`,{
      method:"GET",
    })
    let data = await res.json()
    if(data && data.status == 200){
      console.log("res:: ",data.body);
      navigate('/message',{});
    }
    
  }

  return(
    <div>
      <form onSubmit={handleJoin}>
        <input value={value} onChange={(e)=>e.target.value}/>
        <button type="submit">Join</button>
      </form>
    </div>
  )
}

export default Join;