const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema({
    user: {
        type: String,
        default: ''
     },
    token: {
        type: String,
        required:true
    },
    expires: {
        type: Date,
        default: new Date()
    }
});


module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);