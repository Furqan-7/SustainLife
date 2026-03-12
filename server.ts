import express from "express";
import { createServer as createViteServer } from "vite";
import Groq from "groq-sdk";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "dummy_key" });

let mockUser = {
  ecoCoins: 1240,
  streak: 7,
  unlockedSDGs: [3]
};

let mockHabits: Record<string, any> = {};

const getToday = () => new Date().toISOString().split('T')[0];

const getOrCreateHabit = (today: string) => {
  if (!mockHabits[today]) {
    mockHabits[today] = {
      waterIntake: 0,
      mealLogged: false,
      moodLogged: false,
      cardsRead: 0
    };
  }
  return mockHabits[today];
};

app.get("/api/dashboard", async (req, res) => {
  const today = getToday();
  const habit = getOrCreateHabit(today);
  return res.json({ user: mockUser, habit });
});

app.post("/api/analyze-meal", async (req, res) => {
  const { meal } = req.body;
  const today = getToday();
  const habit = getOrCreateHabit(today);

  try {
    let analysis;
    if (process.env.GROQ_API_KEY) {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a nutrition expert. Analyze the meal and return a JSON object with 'calories' (number), 'healthScore' (1-10), and 'tip' (string). Be concise."
          },
          {
            role: "user",
            content: meal
          }
        ],
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" }
      });
      analysis = JSON.parse(chatCompletion.choices[0].message.content || "{}");
    } else {
      analysis = {
        calories: 450,
        healthScore: 8,
        tip: "Great balance of fiber and protein! (Mock Data)"
      };
    }

    mockUser.ecoCoins += 15;
    if (!mockUser.unlockedSDGs.includes(3)) mockUser.unlockedSDGs.push(3);
    habit.mealLogged = true;

    res.json({ ...analysis, coinsEarned: 15 });
  } catch (error) {
    console.error("Groq error:", error);
    res.status(500).json({ error: "Analysis failed" });
  }
});

app.patch("/api/habit/mood", async (req, res) => {
  const today = getToday();
  const habit = getOrCreateHabit(today);
  mockUser.ecoCoins += 10;
  habit.moodLogged = true;
  res.json({ user: mockUser, habit });
});

app.patch("/api/habit/cards", async (req, res) => {
  const today = getToday();
  const habit = getOrCreateHabit(today);
  mockUser.ecoCoins += 20;
  habit.cardsRead += 1;
  if (habit.cardsRead >= 3 && !mockUser.unlockedSDGs.includes(5)) {
    mockUser.unlockedSDGs.push(5);
  }
  res.json({ user: mockUser, habit });
});

app.patch("/api/habit/water", async (req, res) => {
  const { amount } = req.body;
  const today = getToday();
  const habit = getOrCreateHabit(today);

  if (habit.waterIntake >= 3000) {
    return res.json({ user: mockUser, habit });
  }

  mockUser.ecoCoins += 5;
  habit.waterIntake = Math.min(habit.waterIntake + amount, 3000);

  if (habit.waterIntake >= 3000 && !mockUser.unlockedSDGs.includes(6)) {
    mockUser.unlockedSDGs.push(6);
  }
  res.json({ user: mockUser, habit });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();