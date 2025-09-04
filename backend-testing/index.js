const express = require("express");
const app = express();

app.use(express.json());

app.post("/signup", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "please send all required details" });

    return res.status(200).json({ message: "ok" });
  } catch (error) {
    return res.status(400).json({ message: "please provide values" });
  }
});

module.exports = app;
