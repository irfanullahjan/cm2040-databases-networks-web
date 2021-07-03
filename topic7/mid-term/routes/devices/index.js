var express = require("express");
var router = express.Router();

// Devices main page
router.get("/", function (req, res) {
  const sqlquery =
    "SELECT user_devices.id, device_types.name as type, user_devices_configs.value as name FROM user_devices\
      LEFT JOIN device_types ON device_types.id = user_devices.device_type_id\
      LEFT JOIN user_devices_configs ON user_devices_configs.user_device_id = user_devices.id\
      WHERE user_devices_configs.config_type_id = 1\
      ORDER BY user_devices.id";
  db.query(sqlquery, (err, result) => {
    if (err) {
      res.status(500).send("Database query to fetch user devices failed.");
      return;
    }
    res.render("devices/index.html", {
      title: "Registered devices",
      userDevicesDetails: result,
    });
  });
});

// Add new device page
router.use("/add", require("./add"));

// Edit device confirmation
router.use("/edit", require("./edit"));

// Delete device confirmation page
router.use("/delete", require("./delete"));

module.exports = router;
