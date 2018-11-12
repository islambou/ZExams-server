const mongoose = require("mongoose");
const schema = require("mongoose").Schema;
const QUESTIONS_COLLECTION = require("../consts/collections")
  .QUESTIONS_COLLECTION;

const questionSchema = new schema({
  question: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  answers: {
    type: Array,
    required: true,
    items: [
      {
        type: "object",
        properties: {
          answer: {
            type: String,
            required: true
          },
          correct: {
            type: Boolean,
            required: true
          }
        }
      }
    ]
  }
});

module.exports = mongoose.model(
  QUESTIONS_COLLECTION,
  questionSchema,
  QUESTIONS_COLLECTION
);
