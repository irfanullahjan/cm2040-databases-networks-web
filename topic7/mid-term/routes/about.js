var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  // About page
  res.render("about.html", {
    title: "About",
    appHost: process.env.APP_HOST,
    appPort: process.env.APP_PORT,
    db: {
      "MySQL DB name": process.env.MYSQL_DATABASE,
      "MySQL hostname": process.env.DB_HOST,
      "MySQL port": process.env.DB_PORT,
      "MySQL user": process.env.DB_USER,
    },
  });
});

module.exports = router;
