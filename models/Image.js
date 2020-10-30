const mongoose = require("mongoose");

const Image = new mongoose.Schema({
    imageId: {
        type: String,
        required: true},
    Image:{
        type: Buffer,
        required: true
    }
});

module.exports = mongoose.model("Image", Image);