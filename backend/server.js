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
    console.log('Getting entries');
    const authorization = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN);
        //get name, recipes
        FoodEntry.find({userid: decoded._id}, (err,docs)=>{
            console.log(docs);
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
//app.get('/posts', authenticateToken, function....)
app.post('/add', async function(req,res,next){
    //adds a new recipe to the user's entries
    const authorization = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN);
        //find the user food entry, push a new recipe in their Entries and return the updated doc
        let d = await FoodEntry.findOneAndUpdate({userId: decoded._id}, {$push: {"Entries":req.body.recipe}}, {new:true});
        var entry = d["Entries"][d["Entries"].length-1];
        res.send({status:true, message: "added entry", recipe: entry})
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "token error" });
      }
})



/*
Edit Food Entry
*/
app.put('/edit', function(req,res,next){
    //edits a recipe
    console.log(req.body);
    const authorization = req.headers.authorization.split(" ")[1];
    try{
        const decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN);
        //update that specific item in array (more like replacing it)
        FoodEntry.findOne({userId: decoded._id}, function(err,doc){
            if(err){
                console.log({status:false, message:"Server Error"})
            }
            else{
                console.log(doc.Entries[req.body.index]);
                doc.Entries[req.body.index] = req.body.updatedObject;
                doc.markModified("Entries");
                doc.save();
                console.log(doc);
                res.send({status:true, message:"Success Edit"})
            }
        })

    }
    catch(err){
        console.log("token errors");
    }
})



/*
Delete Food Entry 
*/
app.delete('/delete', function(req,res,next){
    //deletes a food entry
    //gets the user from the token, searches for entry with that id
    console.log(req.body.id);
    const authorization = req.headers.authorization.split(" ")[1];
    try{
        const decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN);
        FoodEntry.updateOne({userId: decoded._id}, {$pull:{"Entries": {_id: req.body.id}}}, {safe:true, multi:true}, function(err, object){
            if(err){
                res.send({status:false, message:"Error while updating/Server Error"});
            }
            else{
                console.log(object)
                res.send({status:true, message:"success in deleting"});
            }
        });
    }
    catch(err){
        res.send({status:false, message:"error with token"});
        }

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