const express = require("express");
const cors = require("cors");
require("./database/connection");
require("dotenv").config();

const sentenceRouter = require("./routes/SentenceRoutes");
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(sentenceRouter);

// Add a catch-all route to help diagnose routing issues
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
