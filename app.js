const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const app = express();
const port = 3000;


// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
app.use(express.static("public"));




app.get("/", (req, res) => {
  res.sendFile(__dirname+"/signup.html");
})

app.post('/', function (req, res, next) {
    // res.send(JSON.stringify(req.body));
    // console.log(req.body);
    var fname = req.body.firstName;
    var lname = req.body.lastName;
    var email = req.body.email;
    
  });



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})