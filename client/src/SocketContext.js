import React, { useState, useEffect, useRef, createContext } from 'react';
import { io } from "socket.io-client";
import Peer from "simple-peer"

const SocketContext = createContext();

const socket = io("https://echo-video-chat.onrender.com");

const ContextProvider = ({ children }) => {
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef=useRef();
  const [callStatus,setCallStatus] =useState('call');

  const [userId, setUserId] = useState("")

  const [myId, setMyId] = useState();
  const [stream, setStream] = useState();
  const [name, setName] = useState();

  const [callAccepted, setCallAccepted] = useState(false);
  const [isCallinfo, setIsCallinfo] = useState(false);
  const[callEnded,setCallEnded] = useState(false);

  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    socket.on("me", id => setMyId(id));
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then((stream) => {
      setStream(stream)
      myVideo.current.srcObject  = stream;


    }
    );


    socket.on("callUser", ({ from, name, signal }) => {
      setCaller(from);
      console.log(from);
      setUserName(name);
      setIsCallinfo(true);
      setCallerSignal(signal);

    })



  }, [])
  const userCall = (userId) => {
    setCallStatus("Calling...")
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream

    })

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: userId,
        signalData: data,
        from: myId,
        name: name
      })

      peer.on('stream', stream => {
        userVideo.current.srcObject = stream;
      })

      socket.on("callAccepted", signal => {
        setCallAccepted(true);
        peer.signal(signal);
      })

    })
    connectionRef.current=peer;

  }
  const answerCall = () => {
    setIsCallinfo(false);
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream

    });
    peer.on('signal', data => { 
      socket.emit('answerCall', { signal: data, to: caller })
    });
    peer.on("stream", stream => {
      userVideo.current.srcObject = stream;
    })
    peer.signal(callerSignal);
    connectionRef.current=peer;

  }
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return(
      <SocketContext.Provider value={{
          myVideo,
          stream,
          userVideo,
          userId,
          myId,
          isCallinfo,
          callAccepted,
          name,
          setName,
          userCall,
          answerCall,
          setUserId,
          userName,
          leaveCall,
          callEnded,
          callStatus,


      }}>
      {children}

      </SocketContext.Provider>
  )

}


export { ContextProvider,SocketContext };

