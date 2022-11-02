import React, { useState } from "react";
import { groupNamesPicker, PickStyle, userID } from "../utils/utils"
import Picker, { SKIN_TONE_NEUTRAL } from "emoji-picker-react";
import { useEffect } from "react";
import { CloseButton } from "react-bootstrap";
import ContentEditable from "react-contenteditable";
import axios from "axios";


const FormMessage = ({ WithImage, sendTo, picker, sendMessage, sender }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [file, setFile] = useState(null)

    // is open picker ??
    const [pickerText, setPickerText] = useState(false);
    const [pickerImage, setPickerImage] = useState(false);

    // text input message
    const [text, setText] = useState("")

    // handle button submit enable 
    const [activeSubmit, setActiveSubmit] = useState(false)
    useEffect(()=> {
      if(text){
        setActiveSubmit(!activeSubmit)
      }else{
        setActiveSubmit(false)
      }
    }, [text])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('textMessage', text)
        formData.append('conversation', JSON.stringify({receiver: sendTo, sender: sender, senderID : userID}))

        imagePreview && formData.append('image', file)
        console.log(sendTo)

        if(text || imagePreview){
          const message = await axios.put("http://localhost:5000/message", formData)
          const res = (await message).data.status

          if(res === "ok"){
            sendMessage()
          }

          setImagePreview(null)
          setText("")
        } 
    }

    const onEmojiClick = (event, objectEmoji) => {
        setText(`${text}${objectEmoji.emoji}`)
    }

    const onFileChange = (e) => {
        const file = e.target.files
        
        if(file[0].type === "image/gif" || "image/jpeg" || "image/png" && file.length > 0){
          const reader = new FileReader();
          reader.addEventListener('load', () => 
          setImagePreview(reader.result)
          );
          setFile(file[0])
          reader.readAsDataURL(file[0]);
        }else{  
          setImagePreview(null)
        }

        /*
          set input file value to null to be able to change changes again even with the same file
        */
        e.target.value = null
    }

    useEffect(() => {
      if(imagePreview){
        WithImage(true)
      }else{
        WithImage(false)
      }
    }, [imagePreview])

    // handle height chatContainer when click picker emoji
    useEffect(()=> {
        if(pickerText){
          picker(true)
        }else{
          picker(false)
        }
    }, [pickerText])

    // reset message recipients and all messages when userID changes chat room
    useEffect(() => {
      if(sendTo){
        setText("")
        setImagePreview(null)
      }
    }, [sendTo])

    return (
      <>
        <form id={imagePreview ? "FormFile" : "FormText"} onSubmit={handleSubmit}>
          <input type="file" accept="image/gif, image/jpeg, image/png" id="imageFile" onChange={onFileChange} style={{display: "none"}} />
          { imagePreview ?
            (
              <>
                  <div id="close">
                    <CloseButton onClick={() => setImagePreview(null)} variant="white"/>
                  </div>
                  <img src={imagePreview} id="imagePreview"/>
                  { pickerImage &&  <Picker disableAutoFocus disableSearchBar groupNames={groupNamesPicker} pickerStyle={PickStyle({ width: "60%", height: "180px", position: "absolute" })} skinTone={SKIN_TONE_NEUTRAL} onEmojiClick={onEmojiClick}/>}
                  <div id="inputForm">
                      <div id="textForm">
                          <ContentEditable name="messsage" onChange={(e) => setText(e.target.value)} html={text} tagName="span" id="textMessage" style={{ padding: "5px 0px" }} />
                          <i className="bi bi-emoji-smile icon" onClick={() => setPickerImage(!pickerImage)}></i>
                      </div>
                      <button id="submitText" type="submit"><i className="bi bi-send-fill icon"></i></button>
                  </div>
              </>
            )
            :
            (
              <>
                { pickerText && <Picker disableAutoFocus disableSearchBar groupNames={groupNamesPicker} pickerStyle={PickStyle({ width: '100%', height: '200px', y : "-8%"})} skinTone={SKIN_TONE_NEUTRAL} onEmojiClick={onEmojiClick}/>}
                <div id="formInput">
                    <section id="inputFile">
                        <i className="bi bi-emoji-smile icon" onClick={() => setPickerText(!pickerText)}></i>
                        <label htmlFor="imageFile"><i className="bi bi-card-image icon"></i></label>
                    </section>
                    <ContentEditable name="message" onChange={(e) => setText(e.target.value)} html={text} tagName="span" id="textMessage" style={{ padding: "10px 15px" }} />
                    <button id="submitText" type="submit"><i className="bi bi-send-fill icon"></i></button>
                </div>
              </>
            )
          }
        </form>
      </>
    )
}

export default FormMessage