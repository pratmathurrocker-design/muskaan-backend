import express from "express";

const app = express();
app.use(express.json());

// IMPORTANT: use global fetch (no node-fetch needed)

app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.message;

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

    res.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (err) {
    console.log(err);
    res.json({ reply: "Server error" });
  }
});

// health check
app.get("/", (req, res) => {
  res.send("Muskaan Prahari backend running");
});

// ✅ CRITICAL FIX: dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
