var passport = require("passport");
var express = require("express");
var router = express.Router();
const model = require("../db/userAnserws");
/* post a new model. */
router.post("/", function(req, res) {
  //add some checkings first
  let payload = req.body;
  console.log(payload);
  const result = model.insertMany([payload]);
  result.then(v => res.send(v)).catch(e => {
    console.log(e);
    res.status(500).send({ message: e.message });
  });

  result.then(v => res.send(v)).catch(e => {
    console.log(e);
    res.status(500).send({ message: e.message });
  });
});

/* get specific modals. */
router.post("/post", function(req, res) {
  //add some checkings first
  model
    .insertMany([{ user: "1", answers: req.body }])
    .then(v => res.sendStatus(200))
    .catch(e => res.sendStatus(500));
});

router.patch("/", function(req, res) {
  //add some checkings first
  let payload = req.body;
  console.log(payload);
  const result = model.update(
    { _id: payload._id },
    { questions: payload.questions }
  );
  result
    .then(v =>
      model
        .findById(payload._id)
        .then(el => res.send(el))
        .catch(e => res.status(500).send({ message: e.message }))
    )
    .catch(e => {
      console.log(e);
      res.status(500).send({ message: e.message });
    });
});

/* get all models */
router.get("/", function(req, res) {
  const result = model.find({});
  result.then(v => res.send(v)).catch(e => {
    console.log(e);
    res.sendStatus(500);
  });
});

/*delete models */
router.delete("/", function(req, res) {
  const result = model.remove({ _id: { $in: req.body } });
  result.then(v => res.send(req.body)).catch(e => {
    console.log(e);
    res.sendStatus(500);
  });
});

module.exports = router;
