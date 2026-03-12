import express from "express";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import Groq from "groq-sdk";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

// --- Database Schema ---

const userSchema = new mongoose.Schema({
  ecoCoins: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  unlockedSDGs: { type: [Number], default: [] },
});

const dailyHabitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: String, required: true }, // YYYY-MM-DD
  waterIntake: { type: Number, default: 0 }, // in ml
  mealLogged: { type: Boolean, default: false },
  moodLogged: { type: Boolean, default: false },
  cardsRead: { type: Number, default: 0 }, // 0-3
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
const DailyHabit = mongoose.models.DailyHabit || mongoose.model("DailyHabit", dailyHabitSchema);

// --- MongoDB Connection ---
let isConnected = false;
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      isConnected = true;
    })
    .catch(err => console.error("MongoDB connection error:", err));
} else {
  console.warn("MONGODB_URI not found. Using mock data mode.");
}

// --- Mock Data Fallback ---
let mockUser = {
  _id: "mock_user_id",
  ecoCoins: 1240,
  streak: 7,
  unlockedSDGs: [3]
};

let mockHabits: Record<string, any> = {
  [new Date().toISOString().split('T')[0]]: {
    waterIntake: 1300,
    mealLogged: false,
    moodLogged: false,
    cardsRead: 0
  }
};

// --- Groq SDK ---
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "dummy_key" });

// --- API Routes ---

app.get("/api/dashboard", async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  
  if (isConnected) {
    try {
      let user = await User.findOne();
      if (!user) {
        user = await User.create({ ecoCoins: 1240, streak: 7, unlockedSDGs: [3] });
      }
      let habit = await DailyHabit.findOne({ userId: user._id, date: today });
      if (!habit) {
        habit = await DailyHabit.create({ userId: user._id, date: today });
      }
      return res.json({ user, habit });
    } catch (error) {
      return res.status(500).json({ error: "Database error" });
    }
  } else {
    return res.json({ user: mockUser, habit: mockHabits[today] });
  }
});

app.post("/api/analyze-meal", async (req, res) => {
  const { meal } = req.body;
  const today = new Date().toISOString().split('T')[0];

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
      // Mock analysis
      analysis = {
        calories: 450,
        healthScore: 8,
        tip: "Great balance of fiber and protein! (Mock Data)"
      };
    }

    if (isConnected) {
      const user = await User.findOne();
      if (user) {
        user.ecoCoins += 15;
        if (!user.unlockedSDGs.includes(3)) user.unlockedSDGs.push(3);
        await user.save();
        await DailyHabit.findOneAndUpdate(
          { userId: user._id, date: today },
          { mealLogged: true },
          { upsert: true }
        );
      }
    } else {
      mockUser.ecoCoins += 15;
      if (!mockUser.unlockedSDGs.includes(3)) mockUser.unlockedSDGs.push(3);
      mockHabits[today].mealLogged = true;
    }

    res.json({ ...analysis, coinsEarned: 15 });
  } catch (error) {
    console.error("Groq error:", error);
    res.status(500).json({ error: "Analysis failed" });
  }
});

app.patch("/api/habit/water", async (req, res) => {
  const { amount } = req.body; // e.g., 250
  const today = new Date().toISOString().split('T')[0];

  if (isConnected) {
    const user = await User.findOne();
    if (user) {
      user.ecoCoins += 5;
      await user.save();
      const habit = await DailyHabit.findOneAndUpdate(
        { userId: user._id, date: today },
        { $inc: { waterIntake: amount } },
        { upsert: true, new: true }
      );
      if (habit.waterIntake >= 3000 && !user.unlockedSDGs.includes(6)) {
        user.unlockedSDGs.push(6);
        await user.save();
      }
      res.json({ user, habit });
    }
  } else {
    mockUser.ecoCoins += 5;
    mockHabits[today].waterIntake += amount;
    if (mockHabits[today].waterIntake >= 3000 && !mockUser.unlockedSDGs.includes(6)) {
      mockUser.unlockedSDGs.push(6);
    }
    res.json({ user: mockUser, habit: mockHabits[today] });
  }
});

app.patch("/api/habit/mood", async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  if (isConnected) {
    const user = await User.findOne();
    if (user) {
      user.ecoCoins += 10;
      await user.save();
      const habit = await DailyHabit.findOneAndUpdate(
        { userId: user._id, date: today },
        { moodLogged: true },
        { upsert: true, new: true }
      );
      res.json({ user, habit });
    }
  } else {
    mockUser.ecoCoins += 10;
    mockHabits[today].moodLogged = true;
    res.json({ user: mockUser, habit: mockHabits[today] });
  }
});

app.patch("/api/habit/cards", async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  if (isConnected) {
    const user = await User.findOne();
    if (user) {
      user.ecoCoins += 20;
      await user.save();
      const habit = await DailyHabit.findOneAndUpdate(
        { userId: user._id, date: today },
        { $inc: { cardsRead: 1 } },
        { upsert: true, new: true }
      );
      if (habit.cardsRead >= 3 && !user.unlockedSDGs.includes(5)) {
        user.unlockedSDGs.push(5);
        await user.save();
      }
      res.json({ user, habit });
    }
  } else {
    mockUser.ecoCoins += 20;
    mockHabits[today].cardsRead += 1;
    if (mockHabits[today].cardsRead >= 3 && !mockUser.unlockedSDGs.includes(5)) {
      mockUser.unlockedSDGs.push(5);
    }
    res.json({ user: mockUser, habit: mockHabits[today] });
  }
});

// --- Vite Middleware ---
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
