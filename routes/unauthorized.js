const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.send(401);
});
module.exports = router;
