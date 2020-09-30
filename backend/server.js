var express = require('express');
var app = express();
const jwt = require('jsonwebtoken');
require("dotenv/config");
const mongoose = require('mongoose');
const FoodEntry = require("./models/FoodEntry");


function middleware(req, res, next){
    console.log('here is my middleware2');
    next();
}

app.use(middleware);
//makes json legible
app.use(express.json());



/*
Get Food Entries
*/
app.get('/entries', function(req,res,next){
    //gets the food entries according to the user id
    //parse the token and decode it
    //look for file with that user id
    //when found, send info back
    console.log('Getting entries');
    console.log("req headers"+req.headers.authorization);
    const authorization = req.headers.authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN);
        //get name, recipes
        FoodEntry.findById(decoded._id, (err,docs)=>{
            if(err){
                return res.json("server error")
            }
            else{
                return res.json(docs);
            }
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "server error" });
      }
})


/* Add New Food Entry */
app.get('/posts', authenticateToken, function(req,res,next){
    //adds a new recipe to the user's entries
    //
    return res.json(test_post);
})



/*
Edit Food Entry
*/
app.put('/edit', function(req,res,next){
    //edits a recipe
})



/*
Delete Food Entry 
*/
app.delete('/delete', function(req,res,next){
    //deletes a food entry
})

function authenticateToken(req, res, next){ //this would be the middleware
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null){
        return res.send({status:false, message:'No Token'})
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err,user)=>{
        if(err){
            return res.send({status:false, message:'Invalid'})//token expired
        }
        req.user=user;
        next();
    })
}

mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true },
    function(req,res){
        console.log("Connected to the DB2");
});

app.listen(4000, process.env.IP, ()=> console.log('starting server'));