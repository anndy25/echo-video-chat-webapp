import React, { useContext, useState } from 'react'
import { SocketContext } from '../SocketContext';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import CallEndIcon from '@material-ui/icons/CallEnd';
import Button from '@material-ui/core/Button';




const homeCss = {
    width: '100%',
    height: "100%",
    zIndex: 1,
    objectFit: 'cover'


}

const videoCss = {
    width: "20%",
    height: "20%",
    position: 'absolute',
    bottom: '3.8rem',
    right: "0",
    border: "2px solid white",
    zIndex: 2,
    objectFit: 'cover'
}


export const MyVideoPlay = () => {

    const { callAccepted, userVideo, myVideo, stream, leaveCall, callEnded } = useContext(SocketContext);
    const [micStatus, setMicStatus] = useState(true);
    const [cameraStatus, setCameraStatus] = useState(true);
    const [videoStatus, setVideoStatus] = useState(true);
    const [videoStatus1, setVideoStatus1] = useState(false);
    const toggleCameraStatus = () => {
        const videoTrack = stream.getTracks().find(track => track.kind === 'video');
        videoTrack.enabled = !videoTrack.enabled;
        setCameraStatus(!cameraStatus);

    }
    const toggleMicStatus = () => {
        const micTrack = stream.getTracks().find(track => track.kind === 'audio');
        micTrack.enabled = !micTrack.enabled;
        setMicStatus(!micStatus);

    }

    const myVideoStatus = () => {

        if (callAccepted && videoStatus) {
            setVideoStatus(false);
            setVideoStatus1(true);
            return;
        }
        else return;
    }

    const userVideoStatus = () => {
        if (videoStatus1) {
            setVideoStatus(true);
            setVideoStatus1(false);
            return;

        }
        return;

    }
    return (
        < >

            <div className="position-relative d-flex h-100"  >
                {!callEnded &&
                    <div className={` h-100 `} onClick={myVideoStatus} >
                        
                        <video muted playsInline ref={myVideo} autoPlay style={!callAccepted ? homeCss : (videoStatus ? videoCss : homeCss)} className='' >
                        
                        </video>
                    </div>
                }

                {callAccepted && (
                    < >
                        <div className="h-100" onClick={userVideoStatus}>
                            <video playsInline ref={userVideo} autoPlay style={!videoStatus1 ? homeCss : videoCss} className=''>
                            </video>

                        </div>
                    </>
                )}
                <div className="menu position-absolute bottom-0 start-0  d-flex justify-content-center w-100" >
                    <Button className='rounded-circle circle h-100 m-1' variant="contained" aria-label="add to shopping cart" onClick={toggleCameraStatus}>
                        {cameraStatus ? (<VideocamIcon className='iconColor' />) : (<VideocamOffIcon className='iconColor' />)}
                    </Button>
                    {
                        callAccepted && (
                            <Button className='rounded-circle circle h-100 m-1' variant="contained" aria-label="add to shopping cart" onClick={leaveCall} style={{ backgroundColor: 'red' }}>
                                <CallEndIcon className='iconColor' />
                            </Button>)
                    }

                    <Button className='rounded-circle circle h-100 m-1' variant="contained" aria-label="add to shopping cart" onClick={toggleMicStatus}>
                        {micStatus ? (<MicIcon className='iconColor' />) : (<MicOffIcon className='iconColor' />)}
                    </Button>
                </div>

            </div>



        </>
    )

}

