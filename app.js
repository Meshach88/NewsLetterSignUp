const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
  var firstName = req.body.firstName;
  var lastName = req.body.LastName
  var e_mail = req.body.Email;

  var data = {
    members: [
      {
        email_address: e_mail,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/64360a6286";

  const options = {
    method: "POST",
    auth: "meshach1:29c8daec9abf73af4f4a5473a1b5592c-us21"
  }

  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.send("Successful")
    }else{
      res.send("Failure")
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
})



// API key
// 29c8daec9abf73af4f4a5473a1b5592c-us21

// list ID
// 64360a6286
