var express = require("express");
var router = express.Router();

// Delete device confirmation page
router.get("/:id", function (req, res) {
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

// Delete device action page
router.post("/:id", function (req, res) {
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
    sqlquery = "DELETE FROM user_devices WHERE id = ?";
    db.query(sqlquery, deviceId, (err) => {
      if (err) {
        res.status(500).send("Database query to delete the device failed.");
        return;
      }
      res.render("devices/deleted.html", {
        title: "Device deleted",
        id: deviceId,
      });
    });
  });
});

module.exports = router;
