var passport = require("passport");
var express = require("express");
var router = express.Router();

/* login user. */
router.post(
  "/",
  passport.authenticate("local", { failureMessage: "not logged in" }),
  function(req, res) {
    console.log(req);
    res.send(req.user);
  }
);

module.exports = router;
