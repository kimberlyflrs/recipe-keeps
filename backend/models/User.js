const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true},
    loggedIn: {
        type: Boolean,
        default: false
        },
    email: {
        type: String,
        required:true},
    password: {
        type: String,
        required:true
    },
    entries: {type: Array,
        default: []}
});

module.exports = mongoose.model("User", User);