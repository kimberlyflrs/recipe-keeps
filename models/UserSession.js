const mongoose = require("mongoose");

const UserSession = new mongoose.Schema({
    userid:{
        type:String,
        default:''
    },
    timestamp:{
        type: Date,
        default: Date.now()
    },
    active:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("User_session", UserSession);