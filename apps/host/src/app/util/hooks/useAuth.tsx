import { useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider"


const useAuth = ()=>{

  const {client_url, setUser, currentUser, setClientUrl} = useContext(AuthContext)

  console.log("clienturl in hook:: ",client_url);

  return {client_url, setUser, currentUser, setClientUrl}

}

export default useAuth;