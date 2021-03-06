var express = require("express");
var router = express.Router();

// Add device page
router.get("/:type?", function (req, res) {
  // Device type id is an integer therefore we parseInt, if it fails we set it to 0
  const deviceTypeId = parseInt(req.params["type"]) || 0;

  // Force device type id 1 if the id is invalid
  if (deviceTypeId < 1) {
    res.redirect(301, "/devices/add/1");
    return;
  }

  // Select all device types to show a dropdown user can select device type from
  let sqlquery = "SELECT * FROM device_types";
  db.query(sqlquery, (err, allDevices) => {
    if (err) {
      res.status(500).send("Database query to fetch device types failed.");
      return;
    } else if (allDevices.length < 1) {
      res.status(404).send("No device types exist in the database.");
      return;
    }
    // Select all device configs and possible preset values to prepare new device form
    sqlquery =
      "SELECT * from device_types\
        LEFT JOIN device_types_configs ON device_types.id = device_types_configs.device_type_id\
        LEFT JOIN config_types ON config_types.id = device_types_configs.config_type_id\
        WHERE device_types.id = ?";
    db.query(sqlquery, deviceTypeId, (err, deviceConfigs) => {
      if (err) {
        res
          .status(500)
          .send("Database query to fetch device type configs failed.");
      } else if (deviceConfigs.length < 1) {
        res.status(404).send("Device type doesn't exist in the database.");
        return;
      }
      res.render("devices/add.html", {
        title: "Select a device to add",
        deviceConfigs: deviceConfigs.map((value) => ({
          ...value,
          presets: JSON.parse(value.presets),
        })),
        allDevices: allDevices,
        deviceTypeId: deviceTypeId,
      });
    });
  });
});

// Add device form submitted
router.post("/:type", function (req, res) {
  // Device type id is an integer therefore we parseInt, if it fails we set it to 0
  const deviceTypeId = parseInt(req.params["type"]) || 0;

  // Force device type id 1 if the id is invalid
  if (deviceTypeId < 1) {
    res.status(401).send("Invalid device type Id in route.");
    return;
  }

  // Create user device
  let sqlquery = "INSERT INTO user_devices VALUES (NULL, ?)";
  db.query(sqlquery, [deviceTypeId], (err, device) => {
    if (err) {
      res.status(500).send("Database query to add new user device failed.");
      return;
    }

    // Prepare rows for insertion to user_device_configs i.e. the device settings user has chosen
    const formKeys = Object.keys(req.body);
    const formValues = Object.values(req.body);
    const valuesToInsert = formKeys.map((key, i) => {
      // hack for forcing checkbox unchecked value to be registered with form submission
      const value =
        typeof formValues[i] === "object" ? formValues[i][1] : formValues[i];
      return [device.insertId, +key, value];
    });

    // Save user settings for the device
    sqlquery = `INSERT INTO user_devices_configs VALUES ?`;
    db.query(sqlquery, [valuesToInsert], (err) => {
      if (err) {
        res
          .status(500)
          .send("Database query to save the device properties failed.");
        console.log(err);
        return;
      }

      // Success message
      res.render("devices/added.html", {
        title: "Device added",
        id: device.insertId,
      });
    });
  });
});

module.exports = router;
