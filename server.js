const https = require("https");
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const FILE_NAME = "main.bin";
const FILE_PATH = path.join(__dirname, "files", FILE_NAME);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.get("/download", (req, res) => {
  console.log("---- DEBUG START ----");
  console.log("__dirname:", __dirname);
  console.log("FILE_PATH:", FILE_PATH);
  console.log("Exists?:", fs.existsSync(FILE_PATH));
  console.log("---- DEBUG END ----");

  if (!fs.existsSync(FILE_PATH)) {
    return res.status(404).send("File not found.");
  }

  res.download(FILE_PATH, FILE_NAME, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error sending file.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
