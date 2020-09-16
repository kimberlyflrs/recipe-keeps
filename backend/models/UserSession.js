const mongoose = require("mongoose");

const UserSession = new mongoose.Schema({
    userid:{
        type:String
    },
    timestamp:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("User_session", UserSession);