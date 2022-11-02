import React, { useEffect , useState} from "react";
import uuid from 'react-uuid';
import { formatSendMessage } from "../utils/utils"

const Message = ({ message, users }) => {
    return(
        <>
            <div style={{ paddingBottom: /^/.test(message.text) ? "5px" : "8px" }} className={message.sender === users ? "message-sent" : "message-received"}>
                {            
                    message.image ?
                    (
                        <div style={{width: '100%', height: '300px', overflow: 'hidden', borderRadius: '5px', marginBottom: "10px"}}>
                            <img src={message.image} style={{width: '100%', height: '300px'}}/>
                        </div>
                    )
                    :
                    null
                }
                <div dangerouslySetInnerHTML={{ __html: message.text }}></div>
                <div className="message-timestamp" dangerouslySetInnerHTML={{ __html: formatSendMessage(message.timeStamp)}}></div>
            </div>
        </>
    )
}

export default Message