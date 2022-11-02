const userData = require("../models/user");
const messageData = require("../models/message")
const mongoose = require("mongoose")

class socket{
    constructor(){
        this.socket = require("socket.io")(3500, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        })
    }
    socketEvents(){
        this.socket.on("connection", async (socket) => {
            const users = socket.handshake.query.user
            // switch status online user
            userData.findOneAndUpdate({ _id : users}, { isOnline : true }, async (err, data) => {
                const idUser = data._id.toString()
                // get all contact conversation data
                let cardData = []
                let inConvers = [idUser]
                await messageData.find({ conversation: users  }).
                    populate({ path: "conversation", match: { username: { $ne: data.username }}}).
                    select('message').
                    slice("message", -1). // Get the latest messages
                    sort({"message": -1}). // Sort chat data from newest
                    exec((err, data) => {
                        data.map(object => {
                            object.conversation.map(personalData => {
                                const { _id, profileUrl, username } = personalData
                                cardData.push({_id, profileUrl, username, ...object.message[0]})
                                socket.emit("card-chatData", cardData)

                            })
                        })
                    })

                cardData.map(val => {
                    if(val.length >= 0){
                        inConvers.push(val._id.toString())
                    }
                })

                // get all contact without in conversation
                    userData.find({ _id: { $nin : inConvers }})
                        .exec((err, contacts) => {
                            socket.emit("contact-list", contacts)
                        })

                    // select contact to chat 
                    socket.on('conversation', async (user) => {
                        await userData.findOne({ username: user}, function(err, result){
                            // find their chat
                            messageData.findOne({ conversation: { $all: [result._id.toString(), idUser]}}).
                                select('conversation').
                                select('message').
                                populate({ path: "conversation", match: { "username": { $ne: data.username }}}).
                                exec((err, data) => {
                                    socket.emit("roomChat", data)
                            })
                        })
                    })

                    // add contact to start conversation
                    socket.on("contact-select", async (contactSelect) => {
                        await userData.findOne({ username: contactSelect }).exec((err,user) => {
                            messageData.create({ conversation: [mongoose.Types.ObjectId(idUser), mongoose.Types.ObjectId(user._id.toString())]}, (err, data) => {
                                if(data){
                                    socket.emit("update-convers", user.username)
                                }
                            })
                        })
                    })
            })


            socket.on("disconnect", async () => { 
                // switch status offline user
                userData.findOneAndUpdate({ username : socket.handshake.query.user}, { isOnline : false }, function(err, result){})
            })
        })
    }
}

module.exports = socket