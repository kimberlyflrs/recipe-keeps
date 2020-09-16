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
//add new user
app.post('/new_user', async function(req, res){
    //email set to lower case
    email = req.body['email'].toLowerCase();
    //Steps
    //1. Check email doesn't exist

    User.find({email: email}, (err, docs)=>{
        if(err){
            res.send({
                message: "Error: Server Error"
            })
        }
        else if(docs.length>0){
            res.send({
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
                        res.send({message: err}); 
                    }
                    else{
                        console.log(myuser);
                        res.send({message: "Success!"});               
                    }
                });
            }            
        })
})


/*
Login 
*/
app.post('/login', function(req,res){
    console.log('Log In');
    email = req.body['email'].toLowerCase();

    //Step 1. Check if the user exists
    // ---if no throw error
    // ---else if the user exists
    //-------check if the passwords match and if it does then start a user session
    //-------else throw an error
    User.find({email: email}, (err,docs)=>{
        if(err){
            res.send({message: "Error: Server Error 1"})
        }
        else if(docs.length == 0){
            res.send({message: "Error: Account does not exist"});
        }
        else{
            const user = docs[0];
            if(!user.validPassword(req.body['password'])){
                res.send({message: "Invalid Password"});
            }
            else{
                const userSession = new UserSession();
                userSession.userid = user._id;
                console.log(userSession);
                userSession.save((err, doc) =>{
                    if(err){
                        console.log(err);
                        res.send({message: "Error: Server Error 2"});
                    }
                    else{
                        console.log(userSession);
                        res.send({
                            message: "User Session Created",
                            token: doc._id
                    });
                    }
                })
            }
        }
    })
})

//gets the user file
app.get('/users', function(req, res){
    //let users = ["number 1", "number 2"];
    //res.send({users: users,});
    console.log('Request: '+req.body['email']);
    User.findOne({email: req.body['email']}, function(err,docs){
        if(err || !docs){
            res.send('Error Message:' + err)
        }
        else{
            res.send('Found!: '+ docs);
            return docs;
        }
    });

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

app.listen(5000, process.env.IP, ()=> console.log('starting server'));