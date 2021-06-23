require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const db = mysql.createConnection({ 
 host: process.env.MYSQL_HOST,
 port: process.env.MYSQL_PORT,
 user: process.env.MYSQL_USER,
 password: process.env.MYSQL_PASSWORD,
 database: process.env.MYSQL_DATABASE
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

// All app routes pass through here
app.use("/", require("./routes"));

// require("./routes/main")(app);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));