const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Path to your binary file
const FILE_NAME = "hello_world.bin"; // 🔁 Change this to your actual filename
const FILE_PATH = path.join(__dirname, "files", FILE_NAME);

// Health check route (also useful for uptime pingers)
app.get("/", (req, res) => {
  res.send("Server is running.");
});

// Route to download the bin file
app.get("/download", (req, res) => {
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