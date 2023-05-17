const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const https = require("https");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

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

  app.post("/failure", (req, res) => {
    res.redirect("/");
  });

  //dotenv hidden keys
  const apiKey = process.env.API_KEY;
  const server = process.env.SERVER;
  const listID = process.env.LIST_ID;

  const jsonData = JSON.stringify(data);
  const url = `https://${server}.api.mailchimp.com/3.0/lists/${listID}`;
  const options = {
    method: "POST",
    auth: `anton1:${apiKey}`,
  };
  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      //console.log(JSON.parse(data));
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    });
  });

  request.write(jsonData);
  request.end();
});

// app.listen(port || 3000, () => {
//   console.log(`App listening on port ${port}`);
// });

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});