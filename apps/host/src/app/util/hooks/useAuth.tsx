import { useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider"


const useAuth = ()=>{

  const {client_url, setUser, currentUser} = useContext(AuthContext)

  console.log("clienturl in hook:: ",client_url);

  return {client_url, setUser, currentUser}

}

export default useAuth;