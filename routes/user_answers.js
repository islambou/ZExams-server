var passport = require("passport");
var express = require("express");
var router = express.Router();
const model = require("../db/userAnserws");
const Test = require("../db/test");
const Question = require("../db/question");
const _lang = require("lodash/lang");
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

/* post specific modals. */
router.post("/post", function(req, res) {
  //add some checkings first
  calculateMark(req.body.test, req.body.answers);
  model
    .insertMany([{ user: "1", answers: req.body.answers, test: req.body.test }])
    .then(v => {
      calculateMark(req.body.test, req.body.answers).then(v => {
        res.send(v.toString());
      });
    })
    .catch(e => res.sendStatus(500));
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

/**
 *
 * @param {*} testId the id of the test
 * @param {*} answers list of answers by the user for the questions of the test
 */
async function calculateMark(testId, answers) {
  let goodAnswers = [];
  let test = await Test.findById(testId);
  let testQuestionIds = test.questions;
  let tesQuestions = await Question.find({ _id: { $in: testQuestionIds } });

  tesQuestions.forEach((ques, index) => {
    let goodAns = [];
    goodAnswers.push({ question: ques.id, answers: [] });
    ques.answers.forEach((ans, index) => {
      if (ans.correct) goodAns.push(index);
    });
    goodAnswers[index].answers = goodAns;
  });

  //this is a harsh methode to calculate the mark , we'll go with this one untill we have the time for another one
  //this methode is kinda shaky , i'm assuming all the answer submited by the user for the questions already exist in
  // the goodAns array , (with the same order too ^^')
  let mark = 0;
  goodAnswers.sort();
  answers.sort();

  goodAnswers.forEach(el => {
    let ans = answers.find(e => e.question == el.question);
    if (ans) {
      if (el.answers.length == ans.answers.length) {
        let submarks = 0;
        el.answers.forEach((s, index) => {
          if (s == ans.answers[index]) {
            submarks++;
          }
        });
        if (submarks == el.answers.length) mark++;
      }
    }
  });
  return ((mark / goodAnswers.length) * 100).toFixed(2);
}

module.exports = router;
