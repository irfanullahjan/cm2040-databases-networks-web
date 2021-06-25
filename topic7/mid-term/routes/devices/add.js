var express = require("express");
var router = express.Router();

const view = "devices/add.html";

// Add device form
router.get("/:type?", function (req, res) {
  const deviceTypeId = req.params["type"] || 0;

  // redirect so that first device is selected initially
  if (deviceTypeId < 1) {
    res.redirect(301, "/devices/add/1");
    return;
  }
  let sqlquery = "SELECT * FROM device_types";
  db.query(sqlquery, (err, allDevices) => {
    if (err) {
      res.status(500).send("Database query to fetch device types failed.");
    }
    sqlquery =
      "SELECT * from device_types\
        LEFT JOIN device_types_configs ON device_types.id = device_types_configs.device_type_id\
        LEFT JOIN config_types ON config_types.id = device_types_configs.config_type_id\
        WHERE device_types.id = ?;";
    db.execute(sqlquery, [deviceTypeId], (err, selectedDeviceConfigs) => {
      if (err) {
        res
          .status(500)
          .send("Database query to fetch device type configs failed.");
      }
      res.render(view, {
        title: "Select a device to add",
        selectedDeviceConfigs: selectedDeviceConfigs,
        allDevices: allDevices,
        deviceTypeId: deviceTypeId,
      });
    });
  });
});

// Add device form submitted
router.post("/:type?", function (req, res) {
  res.send("Form submitted");
});

module.exports = router;
