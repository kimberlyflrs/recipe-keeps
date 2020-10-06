const express = require("express");
const mongoose = require('mongoose');
const app = express();
require("dotenv/config");

//Connect Database
mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true },
    function(req,res){
        console.log("Connected to the Database");
    });

//Init Middleware
app.use(express.json({ extended: false }));


//Define Routes

app.use("/api/auth", require("./authserver"));
app.use("/api/foodentries", require("./server"));



app.listen(5000, () => console.log(`server started on port 5000`));