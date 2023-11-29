import React, { createContext, useEffect, useState } from 'react';

type userType = {
  name: string;
  userId:string | undefined | null
} | null;

interface AuthContextType {
    client_url: string | null,
    setUser:any,
    currentUser:userType
}
export const AuthContext = createContext<AuthContextType>({client_url:null, setUser:null, currentUser:null});

interface Props{
  children: React.ReactNode;
}

const AuthProvider:React.FC<Props> = ({children})=>{

  const [client_url, setClientUrl] = useState(null);
  const [useId, setUserId] = useState();
  const [currentUser, setUser] = useState<userType>(null)
  
  useEffect(()=>{
    let formData:FormData = new FormData();
    // let userId = Math.floor(Math.random()*100).toString();
    // formData.append("userId",userId)
    console.log("currentUser:: ",currentUser);
    fetch(`https://3b48-111-92-126-193.ngrok-free.app/chats/negotiate/`,{
      method:"POST",
      body:formData,
      headers:{

      }}).then(res=>res.json()).then(client=>{
        setClientUrl(client.client_url);
      })
  },[setClientUrl])
  // console.log("client url in auth provider:: ",client_url);
  return(
    <AuthContext.Provider value={{client_url: client_url, setUser: setUser, currentUser: currentUser}}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider;