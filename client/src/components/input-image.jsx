import React, { createRef, useState } from "react"
import Picker, { SKIN_TONE_NEUTRAL } from "emoji-picker-react"
import $ from "jquery"
import { groupNamesPicker, PickStyle } from "../utils/utils"
import { Row, Col } from "react-bootstrap"

const InputImage = ({ text, Back }) => {
  const [isOpenPicker, setIsOpenPicker] = useState(false);

  const onEmojiClick = (e, emojiObject) => {
    text(text + emojiObject.emoji)
  }
  
  const handlePost = (e) => {
    e.preventDefault();
    
    const data = new FormData()

    data.append("sendTo", sendTo)
    if(message){
      data.append("textMessage", message)
    }

    $.ajax({
      url: 'http://localhost:5000/message',
      type: 'POST',
      contentType: false,
      processData: false,
      cache: false,
      data: data,
    })
  }
  
  return (
    <>
      <form id="inputImage" onSubmit={handlePost}>
          <span id="close" onClick={() => Back(true)}>&#10006;</span>
          <div className='imgPreview'>
            <img src={previewImage}/>
          </div>
          { isOpenPicker && <Picker disableAutoFocus disableSearchBar groupNames={groupNamesPicker} pickerStyle={PickStyle({ width: '20%', height: '200px', right: "230px", bottom: "150px" })} skinTone={SKIN_TONE_NEUTRAL} onEmojiClick={onEmojiClick}/>}
            <Row>
                <Col>
                    <div className='inputText'>
                        <input type='text' value={message} onChange={(e) => text(e.target.value)} placeholder='type Somethings'/>
                        <i className="bi bi-emoji-smile" onClick={() => setIsOpenPicker(!isOpenPicker)}></i>
                    </div>
                </Col>
                <Col>
                    <button id="submitImage" type="submit"><i className="bi bi-send-fill"></i></button>
                </Col>
            </Row>
      </form>
    </>
  )
}

export default InputImage