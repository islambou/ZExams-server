var passport = require("passport");
var express = require("express");
var router = express.Router();
const question = require("../db/question");
/* post a new question. */
router.post("/add", function(req, res) {
  //add some checkings first
  let payload = req.body;
  console.log(payload);
  const result = question.insertMany([payload]);
  result.then(v => res.send(v)).catch(e => {
    console.log(e);
    res.status(500).send({ message: e.message });
  });
});

/* get  questions */
router.post("/get", function(req, res) {
  console.log(req.body);
  let filter = req.body.length == 0 ? {} : { _id: { $in: req.body } };
  // added the field
  console.log(filter);
  const result = question.find(filter);
  result.then(v => res.send(v)).catch(e => {
    console.log(e);
    res.sendStatus(500);
  });
});

/*delete questions */
router.delete("/", function(req, res) {
  console.log(req.body);
  const result = question.remove({ _id: { $in: req.body } });
  result.then(v => res.send(req.body)).catch(e => {
    console.log(e);
    res.sendStatus(500);
  });
});

module.exports = router;
