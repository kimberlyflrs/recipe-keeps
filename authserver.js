//ONLY LOGIN, LOGOUT, REFRESH TOKENS
//if a user cannot make a call call the token endpoint to refresh.
//refresh token only good until revoked, i may give it an expiration of a day or 2var express = require('express');
var express = require('express');
var app = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv/config");


const User = require("./models/User");
const FoodEntry = require("./models/FoodEntry");
const RefreshToken = require("./models/RefreshToken");


/*
Sign Up
*/
app.post('/signup', function(req, res, next){
    //email set to lower case
    email = req.body['email'].toLowerCase();
    //Steps
    //1. Check email doesn't exist

    User.find({email: email}, (err, docs)=>{
        if(err){
            return res.send({
                status:500,
                message: "Error: Server Error"
            })
        }
        else if(docs.length>0){
            return res.send({
                status:409,
                message: "Error: Account Exists"
            })
        }
        else{
            //Saves information
                const myuser = new User();
                myuser.email = email;
                myuser.password = myuser.generateHash(req.body['password']);
                const fooddb = new FoodEntry();
                fooddb.userId = myuser._id;
                try{
                    myuser.save();
                    fooddb.save();
                    return res.send({status:200, message: "Successful registration"});
                }
                catch(err){
                    return res.send({status:500, message:"Error: Server Error"})
                }


            }            
        })
})


/*
Login POST
*/
app.post('/login', function(req, res, next){ 
    email = req.body['email'].toLowerCase();

    //Step 1. Check if the user exists
    // ---if no throw error
    // ---else if the user exists
    //-------check if the passwords match and if it does then start a user session
    //-------else throw an error
    User.find({email: email}, (err,docs)=>{
        if(err){
            return res.send({status:500, message: "Error: Server Error"})
        }
        else if(docs.length == 0){
            return res.send({status:404, message: "Error: Account does not exist"});
        }
        else{
            const user = docs[0];
            if(!user.validPassword(req.body['password'])){
                return res.send({status:401, message: "Error: Invalid Password"});
            }
            else{
                const acessToken = generateAccessToken(user._id);
                const refreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN);
                //const newRT = new RefreshToken();
                //newRT.user = user._id;
                //newRT.token = refreshToken;
                //newRT.save();
                return res.send({
                    status:200,
                    message: "Tokens created",
                    acessToken: acessToken,
                    refreshToken: refreshToken
                    });
            }
        }
    })
})



/*
Gets a refresh token
 */
app.post('/token', function(req, res, next){
    //get the refresh token
    const refreshToken = req.body.token;
    if(refreshToken===null){
        return res.send({message: "Error: Invalid Token"})
    }
    RefreshToken.find({token: refreshToken}, (err,docs)=>{
        if(err){
            return res.send({status:500, message: "Error: Server Error"})
        }
        else if (docs.length==0){//if refresh token not in db
            return res.send({message: "No refresh tokens"})
        }
        else{//refresh token found
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user)=>{
                if(err){
                    return ({message: "Error: JWT Verification"})
                }
                const accessToken = generateAccessToken(user._id);
                return res.json({accessToken: accessToken})
            })
        }
    })
})


app.post('/verify', function(req,res){
    //checks if the token is valid and not expired
    const token = req.body.token;
    jwt.verify(token, process.env.ACCESS_TOKEN, (err,user)=>{
        if(err){//token has expired
            return res.send({status:401, message:err});
        }
        else{//token is valid
            return res.send({status:200, message:"valid"});
        }
    })
})


app.delete('/logout', function(req,res,next){
    //delete refresh token from db, remove it from localstorage
    const token = req.body.token;
    RefreshToken.findOneAndDelete({token: token}, (err)=>{
        if(err){
            return res.send({message: 'no token found'});
        }
        else{
            return res.send({message:'deleted successfully'});
        }
    })
})


/*Generate Acess Token */
function generateAccessToken(user){
    return jwt.sign({_id: user}, process.env.ACCESS_TOKEN, {expiresIn: '10080m'})
}


module.exports=app;