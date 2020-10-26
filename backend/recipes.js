var express = require('express');
var app = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv/config");
const FoodEntry = require("./models/FoodEntry");
const multer  = require('multer');
var multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');


const s3 = new AWS.S3({
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET
});


/**
 * Single Image Upload
 */
const imgUpload = multer({
    storage: multerS3({
     s3: s3,
     bucket: 'recipekeeps2',
     acl: 'public-read',
     key: function (req, file, cb) {
      cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
     }
    }),
    limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
   }).single('img');


/**
 * delete image from aws
 */
function deleteImage(fileName){
    s3.deleteObject({
        Bucket: 'recipekeeps2',
        Key: fileName
      },function (err,data){
          if(data){
              console.log('deleted successfully')
          }
          else{
              console.log('error deleting image: '+ err)
          }
      })
}


/*
Get Food Entries
*/
app.get('/entries', authenticateToken, function(req,res,next){
    //gets the food entries according to the user id
    console.log('Getting user info through /login route');
    const authorization = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN);
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


/*NEW ADD ROUTE */
app.post( '/add', authenticateToken,( req, res ) => {
    var imageKey;
    imgUpload ( req, res, ( error ) => {
      if( error ){
       console.log( 'errors', error );
       res.json( { error: error } );
      } else {
       // If File not found
       var imageLocation = req.body.imgLoc;
       var imageName = req.body.imageKey;
       if(req.file!==undefined){
            var imageLocation = req.file.location;
            var imageName = req.file.key;
       }
        imageKey = imageName;

        const auth = req.headers.authorization.split(" ")[1];
        try{
            const decoded = jwt.verify(auth, process.env.ACCESS_TOKEN);
            var recipe = {
                "name": req.body.name,
                "prep_time": req.body.prep_time,
                "cook_time": req.body.cook_time,
                "ingredients": req.body.ingredients,
                "directions": req.body.directions,
                "image": imageLocation,
                "imageKey": imageName
            }
            FoodEntry.findOneAndUpdate({userId: decoded._id}, {$push: {"Entries":recipe}}, {safe:true, multi:true, new:true}, function(err, docs){
                if(err){
                    res.send({status:500, message:"Error: updating/Server Error"});
                }
                else{
                    var entry = docs["Entries"][docs["Entries"].length-1];
                    res.send({status:200, recipe:entry});
                }
            });
        }
        catch(err){
            //DELETE IMAGE HERE
            deleteImage(imageKey);
            console.log(err);
            res.send({status: 500});
        }
       }
     });
});



/*
* Edit Food Entry
*/
app.post( '/edit', authenticateToken,( req, res ) => {
    var imageKey;
    imgUpload ( req, res, ( error ) => {
      if( error ){
       console.log( 'errors', error );
       res.json( { error: error } );
      } else {
       // If File not found
       var imageLocation = req.body.imgLoc;
       var imageName = req.body.imageKey;
       if(req.file!==undefined){
            var imageLocation = req.file.location;
            var imageName = req.file.key;
       }
        imageKey = imageName;

        const auth = req.headers.authorization.split(" ")[1];
        try{
            const decoded = jwt.verify(auth, process.env.ACCESS_TOKEN);
            FoodEntry.findOne({userId: decoded._id}, function(err, doc){
                if(err){
                    res.send({status:500, message:"Error: updating/Server Error"});
                }
                else{
                    var recipe = {
                        "name": req.body.name,
                        "prep_time": req.body.prep_time,
                        "cook_time": req.body.cook_time,
                        "ingredients": req.body.ingredients,
                        "directions": req.body.directions,
                        "image": imageLocation,
                        "imageKey": imageName
                    }
                    deleteImage(req.body.imgKey);
                    doc.Entries[req.body.index] = recipe;
                    doc.markModified("Entries");
                    doc.save();
                    res.send({status:200, recipe:recipe});
                }
            });
        }
        catch(err){
            deleteImage(imageKey);
            console.log(err);
            res.send({status: 500});
        }
      }
     });
});



/*
Delete Food Entry 
FINDS THE ENTRY IF ALL GOOD THEN DELETE IMAGE
*/
app.post('/delete', authenticateToken, function(req,res,next){
    console.log(req.body);
    const authorization = req.headers.authorization.split(" ")[1];
    try{
        const decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN);
        FoodEntry.updateOne({userId: decoded._id}, {$pull:{"Entries": {_id: req.body.id}}}, {safe:true, multi:true}, function(err, object){
            if(err){
                res.send({status:500, message:"Error: updating/Server Error"});
            }
            else{
                deleteImage(req.body.imageKey)
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