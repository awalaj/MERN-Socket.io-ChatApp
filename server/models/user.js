const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true, 
            unique: true,
            maxLength: 15
        },
        password: { 
            type: String, 
            required: true,
            select: false,
        }, 
        profileUrl: { 
            type: String, 
            default: 'http://localhost:5000/images/profileUser/default.png' 
        },
        isOnline: { 
            type: Boolean,
            default: false }
        ,
    },
    {
        collection: "users",
    }
)

module.exports = mongoose.model("users", PersonSchema);
