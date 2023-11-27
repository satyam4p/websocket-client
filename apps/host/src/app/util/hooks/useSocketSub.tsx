import React, {useContext, useEffect} from "react";
import SocketContext from "../../providers/Socket/SocketContext";


const useSocketSubscribe = ()=>{

  const {socket} = useContext(SocketContext);
  // when the component, *which uses this hook* mounts,
	// add a listener.
  // useEffect(()=>{
  //   console.log("socket adding listener:: ",eventName);
  //   // socket?.on(eventName, eventHandler);
  //   // Remove when it unmounts
  //   return ()=>{
  //     console.log("removing event listerner:: ",eventName);
  //     // socket?.off(eventName, eventHandler);
  //   }
  // },[eventHandler])
  return socket;
}

export default useSocketSubscribe;