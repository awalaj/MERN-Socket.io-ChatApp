import React, { createRef, useEffect, useState } from "react";
import uuid from "react-uuid";
import Header from "./chat-header";
import FormMessage from "./form-message"
import Message from "./message"

const ChatContainer = ({ chatRoom, loadData, users }) => {
    // const [image, setImage] = useState(null)
    const [image, setImage] = useState(null)
    const [openPicker, setOpenPicker] = useState(false)
    const messageRef = createRef()

    useEffect(() => {
      // auto scroll to top message container after render 
      if(messageRef.current){
        const container = messageRef.current
        
        container.scrollTop = container.scrollHeight
      }
    }, [messageRef])
    
  if(chatRoom){
    const {conversation, message} = chatRoom
    console.log(users)
    return (
      <>
        { 
            conversation.map(data => (
              <Header key={uuid()} roomData={data}/>
            ))
        }
        { !image && 
          <div ref={messageRef} className="chatContent" style={{ overflowY: image === null && "auto",  height: openPicker ? "51.5%" : "80%"}}>
            {   message.length >= 1 && !image ?
                message.map(val => (
                  <Message users={users} key={uuid()} message={val} />
                ))
                :
                <></>
            }
          </div>
        }
          <div className="formMessage" style={{ height: image && "100%" }}>
            <FormMessage sender={users} sendTo={conversation[0]} sendMessage={() => loadData()} WithImage={(bool) => setImage(bool)} picker={(status) => setOpenPicker(status)}/>
          </div> 
      </>
    )
  }
}

export default ChatContainer