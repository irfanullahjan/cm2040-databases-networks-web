var express = require("express");
var router = express.Router();

// Add device form
router.get("/:type?", function (req, res) {
  const deviceTypeId = parseInt(req.params["type"]) || 0;

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
    db.query(sqlquery, [deviceTypeId], (err, deviceConfigs) => {
      if (err) {
        res
          .status(500)
          .send("Database query to fetch device type configs failed.");
      }
      console.log(deviceConfigs);
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
  const deviceTypeId = parseInt(req.params["type"]) || 0;
  // if deviceTypeId is invalid
  if (deviceTypeId < 1) {
    res.status(401).send("Invalid device type Id in route.");
    return;
  }
  let sqlquery = "INSERT INTO user_devices VALUES (NULL, ?)";
  db.query(sqlquery, [deviceTypeId], (err, device) => {
    if (err) {
      res.status(500).send("Database query to add new user device failed.");
      return;
    }
    const formKeys = Object.keys(req.body);
    const formValues = Object.values(req.body);
    const valuesToInsert = formKeys.map((key, i) => {
      // hack for forcing checkbox unchecked value to be registered with form submission
      const value =
        typeof formValues[i] === "object" ? formValues[i][1] : formValues[i];
      return [device.insertId, +key, value];
    });
    sqlquery = `INSERT INTO user_devices_configs VALUES ?`;
    db.query(sqlquery, [valuesToInsert], (err) => {
      if (err) {
        res
          .status(500)
          .send("Database query to save the device properties failed.");
        console.log(err);
        return;
      }
      res.render("devices/added.html", {
        title: "Device added",
        id: device.insertId,
      });
    });
  });
});

module.exports = router;
