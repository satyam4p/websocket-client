import React, { useEffect, useState } from 'react';




const useNegotiate = ()=>{
  const [client_url, setClienturl] = useState();
  const callnegotiate = async (userId:string)=>{
    let formData:FormData = new FormData();
    formData.append("userId",userId);
    let clientUrl = await fetch(`https://3b48-111-92-126-193.ngrok-free.app/chats/negotiate/`,{
      method:"POST",
      body:formData,
      headers:{
      }})
      return await clientUrl.json();
  }
  return {callnegotiate, client_url}

}

export default useNegotiate;