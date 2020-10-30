const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require("dotenv/config");

//Connect Database
mongoose.connect(process.env.DB_CONNECTION_STRING, 
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true },
    function(req, res){
        console.log('Connected to DB');
    }
    ); 


//Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({
    extended:false,
}))
app.use(bodyParser.json());
app.use(cors());


//Define Routes
app.use("/api/auth", require("./authserver"));
app.use("/api/foodentries", require("./recipes"));


//Page not found
app.use((req,res)=>{
    res.status(404).json({
        errors:"page not found"
    })
})




app.listen((process.env.PORT || 5000), () => console.log(`server started on port 5000`));