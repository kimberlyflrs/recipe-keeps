var express = require('express');
var app = express();

require("dotenv/config");

const mongoose = require('mongoose');

const User = require("./models/User");

//custom middleware
//do checking for token, is logged in
function middleware(req, res, next){
    console.log('here is my middleware');
    next();
}

app.use(middleware);

//makes json legible
app.use(express.json());

app.get('/', function(req,res){
    res.send('hello!!');
})

//get user information
app.get('/users', function(req, res){
    let users = ["number 1", "number 2"];

    res.send({users: users,});
})

//add new entry
app.post('/new_entry', async function(req, res){
    try{
        const myuser = new User(req.body);
        await myuser.save();
        res.send(myuser);
    }
    catch(err){
        res.send({message: err});
    }
})

//edit existing entry
app.post('/edit_entry', function(req, res){

})


mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true },
    function(req,res){
        console.log("Connected to the DB");
});

app.listen(3000, process.env.IP, ()=> console.log('starting server'));