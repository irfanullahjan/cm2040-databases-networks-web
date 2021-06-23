var express = require("express");
var router = express.Router();

// Add device
router.get("/:type?", function (req, res) {
  res.render("devices/add.html", {
    title: "Add device " + req.params.type,
  });
});

module.exports = router;
