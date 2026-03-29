import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5.3",
        messages: [
          {
            role: "system",
            content: "You are Muskaan Prahari, a dental assistant for armed forces. Reply in Hindi or English. Keep answers short and safe."
          },
          { role: "user", content: userMsg }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    res.json({ reply: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Muskaan Prahari running");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running"));
