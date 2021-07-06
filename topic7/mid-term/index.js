require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const ejs = require("ejs");
const sassMiddleware = require("node-sass-middleware");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
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

// adding the sass middleware
app.use(
  sassMiddleware({
    src: __dirname + "/common/styles",
    dest: __dirname + "/public",
    debug: false,
  })
);

// Static public files (at root directory)
app.use(express.static("public"));

// require("./routes/main")(app);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);
app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}!$\nPlease go to http://localhost:8089`
  )
);
