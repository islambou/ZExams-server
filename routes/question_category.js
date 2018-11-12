var passport = require("passport");
var express = require("express");
var router = express.Router();
const questionCategory = require("../db/questionCategory");
/* login user. */
router.post("/", function(req, res) {
  //add some checkings first
  let payload = req.body;
  console.log(payload);
  const result = question.insertMany([{ category: payload.question }]);
  result.then(v => res.sendStatus(200)).catch(e => {
    console.log(e);
    res.sendStatus(500);
  });
});

module.exports = router;
