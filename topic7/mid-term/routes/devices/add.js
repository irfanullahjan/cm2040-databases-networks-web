var express = require("express");
var router = express.Router();

const view = "devices/add.html";

// Add device
router.get("/:type?", function (req, res) {
  if (!req.params["type"]) {
    let sqlquery = "SELECT * FROM devicetypes";
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.status(500).send("Database query to fetch device types failed.");
      }
      res.render(view, {
        title: "Select a device to add",
        selectedDevice: req.params["type"],
        allDevices: result,
      });
    });
  } else {
    res.render(view, {
      title: "Add selected device",
      selectedDevice: req.params["type"],
    });
  }
});

module.exports = router;
