var express = require("express");
var router = express.Router();

// Delete device confirmation prompt page
router.get("/:id", function (req, res) {
  // Device id is an integer therefore we parseInt, if it fails we set it to 0
  const deviceId = parseInt(req.params["id"]) || 0;

  // if deviceId is invalid
  if (deviceId < 1) {
    res.status(401).send("Device id is not correct.");
    return;
  }

  // check if the device being deleted actually exists in the database
  let sqlquery = "SELECT * FROM user_devices WHERE id = ?";
  db.query(sqlquery, deviceId, (err, deviceInDb) => {
    if (err) {
      res.status(500).send("Database query to find the device failed.");
      return;
    } else if (deviceInDb.length < 1) {
      res.status(500).send("Device doesn't exist in the database.");
      return;
    }
    res.render("devices/delete.html", {
      title: "Device deleted",
      id: deviceId,
    });
  });
});

// Delete device done page
router.post("/:id", function (req, res) {
  // Device id is an integer therefore we parseInt, if it fails we set it to 0
  const deviceId = parseInt(req.params["id"]) || 0;

  // if deviceId is invalid
  if (deviceId < 1) {
    res.status(401).send("Device id is not correct.");
    return;
  }

  // check if the device being deleted actually exists in the database
  let sqlquery = "SELECT * FROM user_devices WHERE id = ?";
  db.query(sqlquery, deviceId, (err, deviceInDb) => {
    if (err) {
      res.status(500).send("Database query to find the device failed.");
      return;
    } else if (deviceInDb.length < 1) {
      res.status(500).send("Device doesn't exist in the database.");
      return;
    }
    // Delete the device
    // The related configs will be automatically deleted by MySQL
    sqlquery = "DELETE FROM user_devices WHERE id = ?";
    db.query(sqlquery, deviceId, (err) => {
      if (err) {
        res.status(500).send("Database query to delete the device failed.");
        return;
      }
      // Success message
      res.render("devices/deleted.html", {
        title: "Device deleted",
        id: deviceId,
      });
    });
  });
});

module.exports = router;
