import React, { useState, useEffect } from "react";

const SearchConvers = ({ filterContact }) => {
    const [conversation, setConversation] = useState("")

    useEffect(() => {
        filterContact(conversation.toLowerCase())
    }, [conversation])

    return(
        <div className="container-search">
            <div className="form-search">
                <input type="text" value={conversation} onChange={(e) => {setConversation(e.target.value)}} style={{color: "white"}} placeholder="find conversation"/>              
                <button style={{marginRight: '30px', background: 'transparent', border: 'none', color: "white"}}>
                {conversation === "" ? <i onClick={() => setConversation(" ")} className="bi bi-search"></i> : <i onClick={() => setConversation("")} className="bi bi-arrow-left"></i>}
                </button>
            </div>
        </div>
    )
}

export default SearchConvers