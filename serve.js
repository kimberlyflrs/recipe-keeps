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


// serve static assets in production
if (process.env.NODE_ENV === "production") {
    // set static folder
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
  }




app.listen((process.env.PORT || 5000), () => console.log(`server started on port 5000`));