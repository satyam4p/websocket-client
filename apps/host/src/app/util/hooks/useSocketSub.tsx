import React, {useContext, useEffect} from "react";
import SocketContext from "../../providers/Socket/SocketContext";


const useSocketSubscribe = ()=>{

  const {socket} = useContext(SocketContext);
  // when the component, *which uses this hook* mounts,
	// add a listener.
  console.log("id iasdasdasn hook:: ", socket?.id);
  useEffect(()=>{
    
    console.log("id in hook:: ", socket?.id);

    // Use socket?.on(eventName, eventHandler); here

    return () => {
      // Use socket?.off(eventName, eventHandler); here
    };
    
  },[socket])
  

  return socket

}

export default useSocketSubscribe;