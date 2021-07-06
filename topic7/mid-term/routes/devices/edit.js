var express = require("express");
var router = express.Router();

// Edit device page
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
      res.render("devices/edit.html", {
        title: "Select a device to add",
        deviceConfigs: deviceConfigs.map((value) => ({
          ...value,
          presets: JSON.parse(value.presets),
        })),
      });
    });
  });
});

// Add device form submitted
router.post("/:id", function (req, res) {
  const deviceId = parseInt(req.params["id"]) || 0;
  // If device id is invalid i.e. 0 or NaN
  if (deviceId < 1) {
    res.status(400).send("User device id is invalid.");
    return;
  }
  const formKeys = Object.keys(req.body);
  const formValues = Object.values(req.body);
  const valuesToInsert = formKeys.map((key, i) => {
    // hack for forcing checkbox unchecked value to be registered with form submission
    const value =
      typeof formValues[i] === "object" ? formValues[i][1] : formValues[i];
    return [deviceId, +key, value];
  });
  let sqlquery =
    "INSERT INTO user_devices_configs (user_device_id, config_type_id, value)\
      VALUES ?\
      ON DUPLICATE KEY UPDATE value = VALUES(value)";
  db.query(sqlquery, [valuesToInsert], (err) => {
    if (err) {
      res.status(500).send("Database query to add new user device failed.");
      console.error(err);
      return;
    }
    res.render("devices/edited.html", {
      title: "Device updated",
      id: deviceId,
    });
  });
});

module.exports = router;
