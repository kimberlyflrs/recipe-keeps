var express = require('express');
var app = express();

require("dotenv/config");

const mongoose = require('mongoose');

const User = require("./models/User");
const UserSession = require("./models/UserSession");

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
Login 
*/
app.post('/login', function(req, res, next){
    console.log('Log In');
    console.log(req);
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
                const userSession = new UserSession();
                userSession.userid = user._id;
                userSession.save((err, doc) =>{
                    if(err){
                        console.log(err);
                        return res.send({status: false, message: "Error: Server Error 2"});
                    }
                    else{
                        console.log('success')
                        return res.send({
                            status:true,
                            message: "User Session Created",
                            token: doc._id
                    });
                    }
                })
            }
        }
    })
})

/*
Verifys the token is valid
 */
app.get('/verify', function(req, res, next){
    const {query} = req;
    const {token} = query; //get the token
    //verify that it is one of a kind and active
    UserSession.find({_id: token, active: false}, 
        (err,docs)=>{
            console.log(docs);
        if(docs===undefined){//no docs found
            return res.send({status:false, message: "Error: undefined"})
        }
        else if(err){//error thrown by server
            return res.send({status:false, message: "Error: Server Error" })
        }
        else if (docs.length != 1){//no unique document found
            return res.send({status:false, message: "Error: No sessions found"})
        }
        else{
            return res.send({status:true, message: "Successful verification"})
        }
    })
})


/*
Logout
*/
app.get('/logout', function(req, res, next){
    const {query} = req;
    const {token} = query; //get the token
    //verify that it is one of a kind and active
    UserSession.findOneAndUpdate({
        _id: token, active: true
        }, {
            $set:{active:false}
            },null,
        (err,docs)=>{
        if(err){//error thrown by server
            return res.send({status: false, message: "Error: Server Error" })
        }
        else{
            return res.send({status: true, message: "Good"})
        }
    })
})


mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true },
    function(req,res){
        console.log("Connected to the DB");
});

app.listen(5000, process.env.IP, ()=> console.log('starting server'));