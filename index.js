const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Messenger Webhook verification
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Messenger messages
app.post("/webhook", (req, res) => {
  console.log("Messenger event:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Bangla Messenger Bot is running!");
});

app.listen(PORT, () => {
  console.log(`Bot running on port ${PORT}`);
});
