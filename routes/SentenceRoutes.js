const {
  getSentence,
  taggedSentences,
  getTaggedSentences,
} = require("../controllers/SentenceController");

const router = require("express").Router();

router.get("/getsentence", getSentence);
router.post("/taggedsentences", taggedSentences);
router.get("/getTaggedSentences", getTaggedSentences);

module.exports = router;
