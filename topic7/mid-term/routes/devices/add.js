var express = require("express");
var router = express.Router();

const view = "devices/add.html";

// Add device form
router.get("/:type?", function (req, res) {
  let sqlquery = "SELECT * FROM device_types";
  db.query(sqlquery, (err, allDevices) => {
    if (err) {
      res.status(500).send("Database query to fetch device types failed.");
    }
    sqlquery =
      "SELECT * from device_types\
        LEFT JOIN device_types_configs ON device_types.id = device_types_configs.device_type\
        LEFT JOIN config_types ON config_types.id = device_types_configs.config_type\
        WHERE device_types.id = 1;";
    db.query(sqlquery, (err, selectedDeviceType) => {
      console.log(selectedDeviceType);
      if (err) {
        res
          .status(500)
          .send("Database query to fetch device type configs failed.");
      }
      res.render(view, {
        title: "Select a device to add",
        selectedDevice: selectedDeviceType,
        allDevices: allDevices,
      });
    });
  });
});

// Add device form submitted
router.post("/", function (req, res) {
  res.send("Form submitted");
});

module.exports = router;
