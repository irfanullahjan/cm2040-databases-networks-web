var express = require("express");
var router = express.Router();

// View device status
router.get("/:id", function (req, res) {
  const deviceId = parseInt(req.params["id"]) || 0;

  // If device id is invalid i.e. 0 or NaN
  if (deviceId < 1) {
    res.status(400).send("User device id is invalid.");
    return;
  }
  let sqlquery = "SELECT * FROM user_devices WHERE id = ?";
  db.query(sqlquery, deviceId, (err, userDevices) => {
    if (err) {
      res.status(500).send("Database query to fetch user device failed.");
      return;
    } else if (userDevices.length < 1) {
      res.status(404).send("User device does not exist.");
      return;
    }
    sqlquery =
      "SELECT device_types_configs.config_type_id, config_types.name, config_types.input, config_types.presets, user_devices_configs.value FROM user_devices\
        LEFT JOIN device_types ON device_types.id = user_devices.device_type_id\
        LEFT JOIN device_types_configs ON device_types_configs.device_type_id = device_types.id\
        LEFT JOIN config_types ON config_types.id = device_types_configs.config_type_id\
        LEFT JOIN user_devices_configs ON user_devices_configs.config_type_id = device_types_configs.config_type_id AND user_devices_configs.user_device_id = ?\
        WHERE user_devices.id = ?";
    db.query(sqlquery, [deviceId, deviceId], (err, deviceConfigs) => {
      if (err) {
        res
          .status(500)
          .send("Database query to fetch device type configs failed.");
        console.error(err);
        return;
      }
      res.render("devices/status.html", {
        title: "Device status",
        deviceConfigs: deviceConfigs.map((value) => ({
          ...value,
          presets: JSON.parse(value.presets),
        })),
      });
    });
  });
});

module.exports = router;
