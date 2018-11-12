const mongoose = require("mongoose");
const schema = require("mongoose").Schema;
const TEST_COLLECTION = require("../consts/collections").TEST_COLLECTION;

const testSchema = new schema({
  test: {
    type: String,
    required: true
  },
  questions: {
    type: Array,
    required: false,
    items: [
      {
        type: String
      }
    ]
  }
});

module.exports = mongoose.model(TEST_COLLECTION, testSchema, TEST_COLLECTION);
