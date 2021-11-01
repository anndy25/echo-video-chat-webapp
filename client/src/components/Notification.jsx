import React,{useContext} from 'react';
import { SocketContext } from '../SocketContext';


import Button from '@material-ui/core/Button';



export const Notification = () => {
    const {userName,answerCall}= useContext(SocketContext);

    return (

        <div className="shadow-lg w-75 p-2 mt-3 w-50 bg-body m-auto rounded d-flex justify-content-center">
            <h4>{userName} Calling...</h4>
            <Button className="mx-5 " variant="contained" color="primary" width="100%" onClick={answerCall} >Call Accept</Button>
        </div>



    )
}
export default Notification;
