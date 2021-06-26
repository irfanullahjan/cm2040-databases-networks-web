var express = require("express");
var router = express.Router();

// Devices main page
router.get("/", function (req, res) {
  res.render("devices/index.html", {
    title: "My devices",
  });
});
// Add new device page
router.use("/add", require("./add"));

module.exports = router;
