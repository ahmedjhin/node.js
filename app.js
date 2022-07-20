const fs = require('fs')
 const path = require('path')

const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send(
    '<form action="/store-user" method="POST"><label for="usernamee">Your Name</label><input id="usernamee" type="text" name="username"> <button>Submit</button></form>'
  );
}); // localhost:3000/

app.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
});

app.post("/store-user", function (req, res) {
  const userName = req.body.username;
  const filePath  = path.join(__dirname, 'data', 'user.json')
  
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

    existingUsers.push(userName)

  fs.writeFileSync(filePath, JSON.stringify())

  res.send("<h1>username stored!</h1>");
});

app.listen(3000);