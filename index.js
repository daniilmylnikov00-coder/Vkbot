const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const TOKEN = process.env.VK_TOKEN;
const CONFIRMATION = process.env.VK_CONFIRMATION;

app.post("/", async (req, res) => {
  const body = req.body;

  if (body.type === "confirmation") {
    return res.send(CONFIRMATION);
  }

  if (body.type === "message_new") {
    const userId = body.object.message.from_id;

    try {
      await axios.get("https://api.vk.com/method/messages.send", {
        params: {
          user_id: userId,
          random_id: Date.now(),
          message: "Привет! 👋 Спасибо за обращение. Чем могу помочь?",
          access_token: TOKEN,
          v: "5.199"
        }
      });
    } catch (e) {
      console.log(e.response?.data || e.message);
    }

    return res.send("ok");
  }

  res.send("ok");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Bot started");
});