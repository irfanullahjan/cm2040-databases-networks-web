const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const db = mysql.createConnection({ 
 host: process.env.HOST || "localhost",
 user: "root", 
 password: "",
 database: "smarthome"
});
// connect to database 
db.connect((err) => { 
 if (err) { 
 throw err; 
 } 
 console.log("Connected to database"); 
}); 
global.db = db;

const app = express();
const port = 8089;

app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/main")(app);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));