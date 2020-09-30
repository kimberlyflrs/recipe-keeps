const mongoose = require("mongoose");

const FoodEntry = new mongoose.Schema({
    userId: {
        type: String,
        required: true},
    Entries: [{
        name: String,
        prep_time: String,
        cook_time: String,
        ingredients: Array,
        directions: String
        }],
});

module.exports = mongoose.model("Food_entries", FoodEntry);