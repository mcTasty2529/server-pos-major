const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Sentences = require("./models/SentenceSchema");
const TaggedSentences = require("./models/TaggedSchema");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Database connected."))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/getsentence", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const sentences = await Sentences.find()
      .skip((page - 1) * limit)
      .limit(limit);

    if (!sentences) {
      return res.status(400).json({ error: "No sentences found." });
    }

    res.status(200).send(sentences);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
});

app.get("/getTaggedSentences", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 100;

    const taggedWords = await TaggedSentences.find()
      .skip((page - 1) * limit)
      .limit(limit);

    if (!taggedWords) {
      return res.status(400).json({ error: "Not found." });
    }

    res.status(200).send(taggedWords);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "Internal server error", details: e.message });
  }
});

app.post("/taggedsentences", async (req, res) => {
  try {
    const { sentenceId, sentence, taggedWords, sentenceStatus } = req.body;

    if (!sentenceId || !sentence || !taggedWords) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const taggedSentence = await TaggedSentences.create({
      sentenceId,
      sentence,
      taggedWords,
    });

    const setStatus = await Sentences.findOneAndUpdate(
      { index: sentenceId },
      { status: sentenceStatus },
      { new: true, runValidators: true }
    );

    if (!setStatus) {
      return res.status(400).send("Sentence not found.");
    }

    res.status(200).json(taggedSentence);
  } catch (error) {
    console.error("Error in taggedSentences:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    method: req.method,
    path: req.path,
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server Running.");
});
