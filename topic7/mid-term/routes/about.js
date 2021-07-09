var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  // About page
  res.render("about.html", {
    title: "About",
  });
});

module.exports = router;
