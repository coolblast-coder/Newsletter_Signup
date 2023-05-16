const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const https = require("https");

const app = express();
const port = 3000;

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res, next) {
  // res.send(JSON.stringify(req.body));
  // console.log(req.body);
  const fname = req.body.firstName;
  const lname = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/d44ce8defa";
  const options = {
    method:"POST",
    auth: "anton1:e05de41138a84638d97f4d1f091e39b6-us14"
  }
  const request = https.request(url, options, function (response) {
    response.on("data", function (data) { 
        console.log(JSON.parse(data));
     })
  });

request.write(jsonData);
request.end();

});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

//API Key
// e05de41138a84638d97f4d1f091e39b6-us14

//List ID
// d44ce8defa
