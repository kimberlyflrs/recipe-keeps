//ONLY LOGIN, LOGOUT, REFRESH TOKENS
//if a user cannot make a call call the token endpoint to refresh.
//refresh token only good until revoked, i may give it an expiration of a day or 2var express = require('express');
var express = require('express');
var app = express();
const jwt = require('jsonwebtoken');
require("dotenv/config");

const mongoose = require('mongoose');

const User = require("./models/User");
const RefreshToken = require("./models/RefreshToken");


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
                status:true,
                message: "Error: Server Error"
            })
        }
        else if(docs.length>0){
            return res.send({
                status:false,
                message: "Error: Account Exists"
            })
        }
        else{
            //Saves information
                const myuser = new User();
                myuser.name = req.body['name'];
                myuser.email = email;
                myuser.password = myuser.generateHash(req.body['password']);
                myuser.save((err,user)=>{
                    if(err){
                        return res.send({status:false, message: err}); 
                    }
                    else{
                        console.log(myuser);
                        return res.send({status: true, message: "Success!"});               
                    }
                });
            }            
        })
})


/*
Login WILL BE REMOVED
*/
app.post('/login', function(req, res, next){ 
    console.log('Log In through /login route');
    console.log(req.body);
    email = req.body['email'].toLowerCase();

    //Step 1. Check if the user exists
    // ---if no throw error
    // ---else if the user exists
    //-------check if the passwords match and if it does then start a user session
    //-------else throw an error
    User.find({email: email}, (err,docs)=>{
        if(err){
            return res.send({status:false, message: "Error: Server Error 1"})
        }
        else if(docs.length == 0){
            return res.send({status:false, message: "Error: Account does not exist"});
        }
        else{
            const user = docs[0];
            if(!user.validPassword(req.body['password'])){
                return res.send({status:false, message: "Invalid Password"});
            }
            else{
                const acessToken = generateAccessToken(user._id);
                const refreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN);
                const newRT = new RefreshToken();
                newRT.user = user._id;
                newRT.token = refreshToken;
                newRT.save();
                return res.send({
                    status:true,
                    message: "Tokens created",
                    acessToken: acessToken,
                    refreshToken: refreshToken
                    });
            }
        }
    })
})


/*
Login WILL BE REMOVED
*/
app.get('/login', function(req, res, next){ 
    console.log('Getting user info through /login route');
    console.log("req headers"+req.headers.authorization);
    const authorization = req.headers.authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN);
        //get name, recipes
        User.findById(decoded._id, (err,docs)=>{
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


/*
Gets a refresh token
 */
app.post('/token', function(req, res, next){
    //get the refresh token
    const refreshToken = req.body.token;
    console.log(refreshToken);
    if(refreshToken===null){
        return res.send({message: "Error: Invalid Token"})
    }
    RefreshToken.find({token: refreshToken}, (err,docs)=>{
        if(err){
            return res.send({message: "Error: Server Error"})
        }
        else if (docs.length==0){//if refresh token not in db
            return res.send({message: "No refresh tokens"})
        }
        else{//refresh token found
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user)=>{
                if(err){
                    return ({message: "Error: JWT Verification"})
                }
                console.log(user);
                const accessToken = generateAccessToken(user._id);
                return res.json({accessToken: accessToken})
            })
        }
    })
})


app.post('/verify', function(req,res){
    //checks if the token is valid and not expired
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err,user)=>{
        if(err){//token has expired
            console.log("Error here: "+ err);
            return res.send(err);
        }
        else{//token is valid
            console.log("Valid: "+user);
            return res.send("valid");
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


/* TEST Posts */
app.get('/posts', authenticateToken, function(req,res,next){
    return res.json(test_post);
})


/*Generate Acess Token */
function generateAccessToken(user){
    return jwt.sign({_id: user}, process.env.ACCESS_TOKEN, {expiresIn: '1m'})
}

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
        console.log("Connected to the DB");
});

app.listen(5000, process.env.IP, ()=> console.log('starting server'));