import React, {  useContext} from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MyVideoPlay } from './Videoplay';
import "../css/SettingBoard.css"

import TextField from '@material-ui/core/TextField';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Button from '@material-ui/core/Button';
import DuoIcon from '@material-ui/icons/Duo';
import { SocketContext } from '../SocketContext';
import Notification from './Notification';


const SettingBoard = () => {
    const {
        stream,
        myId,
        userCall,
        name,
        setName,
        userId,
        setUserId,
        isCallinfo,
        callAccepted,
        callStatus
    } = useContext(SocketContext);

    return (
        <>
            <div className="shadow-lg p-2 mt-3 bg-body rounded container-lg d-flex justify-content-center align-items-center  " style={{ height:'85vh'}}>

                <section className="pb-2 mt-2 responsive-width row shadow  flex-shrink-0 bg-body rounded border-bottom border-3 border-primary  " style={{height:callAccepted &&'100%'}}>

                    <div className={`col-lg-${!callAccepted ? '6' : '12'} col-md-${!callAccepted ? '6' : '12'} col-sm-${!callAccepted ? '6' : '12'} col-xs-12  position-relative p-0 d-flex justify-content-center`} >
                        {stream && <MyVideoPlay />}



                    </div>

                    {
                        !callAccepted && (
                            < >
                                <div className="col-lg-5 col-sm-5  col-xs-12  container d-flex justify-content-center align-items-center" >
                                    <div className="w-75">
                                        <TextField
                                            id="filled-textarea"
                                            label="Your Name"
                                            placeholder="Your Name"
                                            value={name}
                                            multiline
                                            onChange={(e) => setName(e.target.value)}
                                            variant="filled"
                                            style={{ width: '100%' }}
                                            className="my-2"
                                            required
                                        />
                                        <br />
                                        <TextField
                                            id="filled-textarea"
                                            label="ID To Call"
                                            placeholder="ID To Call"
                                            value={userId}
                                            multiline
                                            onChange={(e) => setUserId(e.target.value)}
                                            variant="filled"
                                            style={{ width: '100%' }}
                                            className="my-2"
                                            required
                                        />
                                        <br />
                                        <CopyToClipboard text={myId} >
                                            <Button className="my-2 w-100" variant="contained" color="primary" width="100%" startIcon={<FileCopyIcon />}>Copy ID</Button>
                                        </CopyToClipboard>
                                        <Button className="w-100" variant="contained" color="primary" width="100%" onClick={() => userCall(userId)}><DuoIcon />{callStatus}</Button>
                                    </div>
                                </div>
                            </>
                        )
                    }

                    {isCallinfo && (
                        <Notification />

                    )}

                </section>
            </div>
        </>
    )
}

export default SettingBoard
