import React, { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Authentication from "./Auth/authentication"
import Chats from "./Chats/Chats"


function App(){
    const [user, setUser] = useState(null)

    const handleStrogeUser = (id) => {
        setUser(id)
    }

    return(
        <BrowserRouter>
            <Routes>
                { //strict page
                    user ? 
                    (<Route exact path="/Chats" element={<Chats/>}/>)
                    :
                    (<Route exact path="/" element={<Authentication user={handleStrogeUser}/>} />)
                }
            </Routes>
        </BrowserRouter>
    )
}
export default App
