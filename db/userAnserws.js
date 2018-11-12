const mongoose = require("mongoose");
const schema = require("mongoose").Schema;
const ANSWERS_COLLECTION = require("../consts/collections").ANSWERS_COLLECTION;

const testSchema = new schema({
  user: {
    type: String,
    required: true
  },
  answers: {
    type: Array,
    required: false,
    items: [
      {
        type: {
          question: String,
          answers: {
            type: Array,
            items: [{ type: String }]
          }
        }
      }
    ]
  }
});

module.exports = mongoose.model(
  ANSWERS_COLLECTION,
  testSchema,
  ANSWERS_COLLECTION
);
