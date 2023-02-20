const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pageNumber: {
    type: Number,
  },
  genre: {
    type: Array,
  },
  rating: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
  },
  user_id : {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = model("Book", bookSchema);