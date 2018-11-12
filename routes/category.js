var passport = require("passport");
var express = require("express");
var router = express.Router();
const question = require("../db/question");

/* get all questions */
router.get("/", function(req, res) {
  const result = question.find({});
  result
    .then(v => {
      let cats = v
        .map(ques => ques.category)
        .filter((value, index, self) => self.indexOf(value) === index);
      res.send(cats);
    })
    .catch(e => {
      console.log(e);
      res.sendStatus(500);
    });
});

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

module.exports = router;
