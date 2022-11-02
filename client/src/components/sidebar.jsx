import React, {useEffect, useState, useRef } from "react"
import SearchContact from "./search-contact"
import { socket, userID } from "../utils/utils"
import uuid from "react-uuid"
import CardContact from "./card-contact"
import { Edit, Check, Visibility, VisibilityOff } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Sidebar = ({ option, onClose, data, loadData }) => {
    const [contactSearch,  setContactSearch] = useState("") // get TextField contact search value 
    const [contactList, setContactList] = useState([])
    const [imageUrl, setImageUrl] = useState('')
    const [focus, setFocus]  = useState(false) // handle focus input
    const [file, setFile] = useState(null)
    const [hide, setHide] = useState(false) // hide password

    const photoProfileRef = useRef()
    const navigate = useNavigate();

    // handleInput Text
    const [newName, setNewName] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const addToConversation = (name) => {
        socket.emit("contact-select", name)
        onClose({ user: name })
    }

    const updateProfile = async (e) => {
      const formData = new FormData();

      formData.append("userID", userID)
      formData.append('users', data.name)
      data.name !== newName && formData.append("nameUpdate", newName)
      newPassword && formData.append("passwordUpdate", newPassword)
      file && formData.append('imageUpdate', file)
      const profile = await axios.put("http://localhost:5000/updateProfile", formData)
      const res = (await profile).data

      if(res.status === 'ok'){
        loadData()
      }
      if(res.status === 'ok' && file){
        window.location.reload(); 
      }
    }

    const onFileChange = (e) => {
      const file = e.target.files[0]
      setFile(file)
      if(file){
        updateProfile()
      }
      e.target.value = null
    }

    useEffect(() => {
      socket.on("contact-list", (data) => {
        setContactList(data)
      }) 
    }, [])
    
    useEffect(() => {
      if(data){
        setNewName(data.name)
        setImageUrl(data.photoProfile)
      }
    }, [data])

    if(newName && imageUrl && data){
      return(
        <>
            <div className={`sidebar${option ? " open" : ""}`}>
                <div className="sidebar-heading">
                  <i onClick={() => onClose()} className="bi bi-arrow-left"></i>
                  <p>{option}</p>
                </div>
                <div className="sidebar-content">
                  { option === "profile" ?
                    (
                      <form className="formUpdate" onSubmit={updateProfile}>
                          <input type="file" accept="image/gif, image/jpeg, image/png" ref={photoProfileRef} onChange={onFileChange} style={{display: "none"}} />
                          <div className="photo" onClick={() => photoProfileRef.current.click()}>
                              <img src={imageUrl} className="photo-profile"/>
                              <div className="overlay">
                                  <div className="text">
                                    <i className="bi bi-camera-fill"></i>
                                    <p>change foto profile</p>
                                  </div>
                              </div>
                          </div>

                          <div className="heading-input">Nama Anda</div>
                          <div className="name-change" style={{ borderBottomWidth: focus === "name" ? "2px" : "0px" }} >
                              <input type="text" className="input" value={newName} readOnly={focus === "name" ? false : true} onChange={(e) => {
                                if(e.target.value.length >= 15){
                                  setNewName(newName)
                                }else{
                                  setNewName(e.target.value)
                                }
                              }}/>
                              { focus === "name" ?  
                                <Check onClick={() => {
                                  setFocus(null)
                                  if(data.name !== newName){
                                    updateProfile()
                                  }
                                }}/>                         
                                :
                                <Edit onClick={() => setFocus("name")}/>
                              }
                          </div>

                          <div className="heading-input">
                            sandi anda
                            <div style={{ fontSize: '10px' }}>jika anda ingin mengganti sandi</div>
                          </div>
                          <div className="password-change" style={{ borderBottomWidth: focus === "password" ? "2px" : "0px" }}>
                              <input className="input" placeholder="sandi baru"  type={hide ? "password" : "text"} value={newPassword} readOnly={focus === "password" ? false : true} onChange={(e) => {
                                if(e.target.value.length >= 15){
                                  setNewPassword(newPassword)
                                }else{
                                  setNewPassword(e.target.value)
                                }
                              }}/>
                              { hide ?  <VisibilityOff onClick={() => setHide(!hide)}/> : <Visibility onClick={() => setHide(!hide)}/> }
                              { focus === "password" ?
                                <Check onClick={() => {
                                  setFocus(null)
                                  if(newPassword){
                                    updateProfile()
                                    navigate('/')
                                  }
                                }}/>                                  
                                :
                                <Edit onClick={() => setFocus("password")}/>
                              }
                          </div>
                      </form>
                    )
                    :
                    (
                      <>
                        <SearchContact filterContact={(contact) => setContactSearch(contact)}/>
                        { contactList.filter( val => {
                            if(contactSearch === ""){
                                return val 
                            }else if(val.username.toLowerCase().includes(contactSearch.toLowerCase())){
                                return val
                            }
                          }).map(v => (
                            <CardContact key={uuid()} data={v} toConversation={addToConversation}/>
                          ))
                        }
                      </>
                    )
                  }
                </div>
            </div>
        </>
      )
    }
}

export default Sidebar