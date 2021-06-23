var express = require("express");
var router = express.Router();

// Home page route
router.get("/", function (req, res) {
  res.render("index.html", {
    title: "MySmartHome",
  });
});

// About page route
router.use("/about", require("./about"));

// Devices page route
router.use("/devices", require("./devices"));

module.exports = router;
