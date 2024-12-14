const mongoose = require("mongoose");

const taggedSchema = new mongoose.Schema({
  sentenceId: {
    type: String,
  },
  sentence: {
    type: String,
    required: true,
  },
  taggedWords: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Tagged_Sentences", taggedSchema);
