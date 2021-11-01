import React from 'react';
import Navbar from "./components/Navbar";
import SettingBoard from "./components/SettingBoard";
import { ContextProvider } from "./SocketContext.js";





const App = () => {
    return (
        <>
            <Navbar />
           
            <ContextProvider>
                <SettingBoard />
            </ContextProvider>

        </>
    )


}

export default App
