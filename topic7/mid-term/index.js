const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const ejs = require("ejs");

// Loading environment variables from .env file
// In case of any change to environment, please check .env to ensure the values are updated
dotenv.config();

// Using environment variables to connect to MySQL database
// If running the app for the first time:
// Please ensure to create database as named in .env file
// Please also manually run migrations file init-db.sql
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// connect to database and make db globally available
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

// Static public files (at root directory)
app.use(express.static("public"));

// Configure EJS
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);

// Starting Express server
app.listen(port, () =>
  console.log(
    `MySmartHome app running.\nHost: localhost\nPort: ${port}`
  )
);
