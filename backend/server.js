var express = require('express');
var app = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv/config");
const FoodEntry = require("./models/FoodEntry");


/*
Get Food Entries
*/
app.get('/entries', authenticateToken, function(req,res,next){
    //gets the food entries according to the user id
    console.log('Getting user info through /login route');
    const authorization = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN);
        console.log(decoded);
        //get name, recipes
        FoodEntry.find({userId: decoded._id}, (err,docs)=>{
            if(err){
                return res.send({status:500, message:"Error: Server error"});
            }
            else{
                return res.send({status:200, message: docs[0]['Entries']});
            }
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "server error" });
      }
})


/* Add New Food Entry */
//app.get('/posts', authenticateToken, function....)
app.post('/add', authenticateToken, async function(req,res,next){
    //adds a new recipe to the user's entries
    const authorization = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN);
        //find the user food entry, push a new recipe in their Entries and return the updated doc
        let d = await FoodEntry.findOneAndUpdate({userId: decoded._id}, {$push: {"Entries":req.body.recipe}}, {new:true});
        var entry = d["Entries"][d["Entries"].length-1];
        res.send({status:200, message: "added entry", recipe: entry})
      } catch (err) {
        res.status(401).json({ message: "Error: token error" });
      }
})



/*
Edit Food Entry
*/
app.put('/edit', authenticateToken, function(req,res,next){
    //edits a recipe
    console.log(req.body);
    const authorization = req.headers.authorization.split(" ")[1];
    try{
        const decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN);
        //update that specific item in array (more like replacing it)
        FoodEntry.findOne({userId: decoded._id}, function(err,doc){
            if(err){
                res.send({status:500, message:"Error: Server Error"});
            }
            else{
                console.log(doc.Entries[req.body.index]);
                doc.Entries[req.body.index] = req.body.updatedObject;
                doc.markModified("Entries");
                doc.save();
                console.log(doc);
                res.send({status:200, message:"Success Edit"});
            }
        })

    }
    catch(err){
        console.log("token errors");
        res.send({status:401, message:"Error: Token Error"});
    }
})



/*
Delete Food Entry 
*/
app.post('/delete', authenticateToken, function(req,res,next){
    //deletes a food entry
    //gets the user from the token, searches for entry with that id
    console.log(req.body.id);
    const authorization = req.headers.authorization.split(" ")[1];
    try{
        const decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN);
        FoodEntry.updateOne({userId: decoded._id}, {$pull:{"Entries": {_id: req.body.id}}}, {safe:true, multi:true}, function(err, object){
            if(err){
                res.send({status:500, message:"Error: updating/Server Error"});
            }
            else{
                console.log(object)
                res.send({status:200, message:"success in deleting"});
            }
        });
    }
    catch(err){
        res.send({status:401, message:"Error: token"});
        }

})

function authenticateToken(req, res, next){ //this would be the middleware
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null){
        return res.send({status:401, message:'Error: No Token'})
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err,user)=>{
        if(err){
            return res.send({status:401, message:'Error: Token Invalid'})//token expired
        }
        req.user=user;
        next();
    })
}


module.exports = app; 