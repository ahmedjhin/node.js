const fs = require("fs");
const path = require("path");

const express = require("express");
const res = require("express/lib/response");
const { stringify } = require("querystring");
const { mainModule } = require("process");

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

  const filePath = path.join(__dirname, "data", "users.json");

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  existingUsers.push(userName);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send("<h1>username stored!</h1>");
});

app.get('/users', function (req, res){
  const filePath = path.join(__dirname, "data", "users.json");

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  let responseData = "<ul>";

  for (const user of existingUsers) {
    responseData += "<li>" + user + "</li>"; 
  }
  responseData += "</ul>";

  res.send(responseData);
})


app.listen(3000);
