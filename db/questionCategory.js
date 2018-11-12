const mongoose = require("mongoose");
const schema = require("mongoose").Schema;
const QUESTIONS_CATEGORY_COLLECTION = require("../consts/collections")
  .QUESTIONS_CATEGORY_COLLECTION;

const questionCategorySchema = new schema({
  category: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model(
  QUESTIONS_CATEGORY_COLLECTION,
  questionCategorySchema,
  QUESTIONS_CATEGORY_COLLECTION
);
