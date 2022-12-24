import React from "react";
import './Chats.css';
import Welcome from "../../components/Welcome";
import UserDesk from "../../components/user-desk";
import ChatContainer from "../../components/chat-container";
import SearchConvers from "../../components/search-convers";
import Sidebar from "../../components/sidebar"
import CardChat from "../../components/card-chat";
import uuid from "react-uuid";
import { socket, userID } from "../../utils/utils";
import axios from "axios";

class Chats extends React.Component{
    constructor(){
        super()
        this.state = {
            cardContact : [], // card data contact in conversation or contact
            chatRoom : null, // message data conversation in room
            currentChat: null, // current conversation room
            searchConvers : '', // search cardChat conversation
            searchAllContact : '', // search contact in application
            openSideBar : false, // open bar addContact or settings
            optionMenu: null, // selected menu
            usersData: {}
        }
        this.loadMessage = this.loadMessage.bind(this)
        this.loadChat = this.loadChat.bind(this)
        this.loadCardChat = this.loadCardChat.bind(this)
        this.onLoadRoom = this.onLoadRoom.bind(this)
        this.closeSideBar = this.closeSideBar.bind(this)
        this.loadUser = this.loadUser.bind(this)
    }

    loadMessage() {
        socket.connect()

        socket.emit('conversation', this.state.currentChat)
        socket.on("roomChat", (data) => {
            this.setState({ chatRoom: data })    
        })            
    }
    
    loadChat(){
        socket.disconnect()

        this.loadMessage()
        this.loadCardChat()
    }
    
    loadCardChat(){
        socket.connect()
        socket.on("card-chatData", async (data) => {
            this.setState({ cardContact: data })
        }) 

    }
    
    onLoadRoom(current){
        this.setState({ currentChat: current }, () => {
            this.loadMessage()
        })
    }

    closeSideBar(userSelected){
        if(userSelected){
            this.setState({ optionMenu: null, currentChat: userSelected.user }, () => {
                socket.disconnect()
                this.loadCardChat()
                this.loadMessage()
            })
        }else{
            this.setState({ optionMenu: null })
        }
    }

    loadUser(){
        axios.get(`http://localhost:5000/users/${userID}`)
            .then(data => {
                this.setState({ usersData: data.data })
            })
    }

    // get all conversation with user
    componentDidMount(){
        socket.connect()
        this.loadUser()
        this.loadCardChat()
    }
    
    componentDidUpdate(){
        socket.connect()
    }

    render(){
        const { cardContact, currentChat, searchConvers, chatRoom, usersData, optionMenu } = this.state
        if(usersData){
            return(
                <>
                    <div className='leftSide'>
                        <UserDesk data={usersData} optionMenu={(menu) => this.setState({ optionMenu: menu })}/>
                        <SearchConvers filterContact={(value) => this.setState({ searchConvers: value })}/>
                        <div className="contact-list">
                            {  cardContact.filter(val => {
                                if(searchConvers === ""){
                                    return val 
                                }else if(val.text.toLowerCase().includes(searchConvers.toLowerCase())){
                                    return val
                                }
                            }).map(data => (
                                <CardChat key={uuid()} data={data} changeRoom={this.onLoadRoom}/>
                            ))
                            }
                        </div>
                    </div>
                    <div className="chatRoom">
                        { currentChat ? <ChatContainer loadData={this.loadChat} chatRoom={chatRoom} users={usersData.name}/> : <Welcome users={usersData.name}/>}
                    </div> 
    
                    <Sidebar 
                        data={usersData} 
                        loadData={this.loadUser} 
                        option={optionMenu} 
                        onClose={this.closeSideBar}
                    />
                </>
            )
        }
    }
}

export default Chats
