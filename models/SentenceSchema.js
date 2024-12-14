const mongoose = require("mongoose");

const sentenceSchema = new mongoose.Schema({
  Content: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Sentences", sentenceSchema);
