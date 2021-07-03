var express = require("express");
var router = express.Router();

// Delete device confirmation page
router.get("/:type?", function (req, res) {
  const deviceId = parseInt(req.params["type"]) || 0;

  // if deviceId is invalid
  if (deviceId < 1) {
    res.status(401).send("Device id is not correct.");
    return;
  }
  let sqlquery = "DELETE FROM user_devices WHERE id = ?";
  db.query(sqlquery, [deviceId], err => {
    if (err) {
      res.status(500).send("Database query to delete the device failed.");
    }
    res.render("devices/deleted.html", {
      title: "Device deleted",
      id: deviceId,
    });
  });
});

module.exports = router;
