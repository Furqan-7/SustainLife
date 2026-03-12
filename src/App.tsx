import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Header from './components/Header';
import AIAnalyzer from './components/AIAnalyzer';
import EcoCoins from './components/EcoCoins';
import SDGImpact from './components/SDGImpact';
import DailyQuests from './components/DailyQuests';
import { UserData, HabitData, AnalysisResult } from './types';

export default function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [habitData, setHabitData] = useState<HabitData | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/dashboard');
      const data = await res.json();
      setUserData(data.user);
      setHabitData(data.habit);
    } catch (err) {
      console.error("Failed to fetch dashboard", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAnalysisSuccess = (result: AnalysisResult) => {
    fetchDashboard();
  };

  const handleMood = async () => {
    try {
      const res = await fetch('/api/habit/mood', { method: 'PATCH' });
      const data = await res.json();
      setUserData(data.user);
      setHabitData(data.habit);
      showToast("+10 EcoCoins! Mood logged");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCards = async () => {
    try {
      const res = await fetch('/api/habit/cards', { method: 'PATCH' });
      const data = await res.json();
      setUserData(data.user);
      setHabitData(data.habit);
      showToast("+20 EcoCoins! Card read");
    } catch (err) {
      console.error(err);
    }
  };

  if (!userData || !habitData) return null;

  return (
    <div className="min-h-screen bg-[#f7f8f6] font-display text-slate-900">
      <Header userData={userData} />

      <main className="max-w-[1400px] mx-auto w-full p-6 lg:p-10">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight"
            >
              Good morning, <span className="text-[#a8d61f]">Warrior</span>.
            </motion.h1>
            <p className="text-slate-500 text-lg mt-2">
              Ready to make an impact? You've saved <span className="font-bold text-slate-900">4.2kg</span> of CO2 this week.
            </p>
          </div>
          <EcoCoins userData={userData} />
        </div>

        <AIAnalyzer onAnalysisSuccess={handleAnalysisSuccess} />

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          <SDGImpact unlockedSDGs={userData.unlockedSDGs} />

          <div className="col-span-12 lg:col-span-4">
            <DailyQuests
              habitData={habitData}
              onMoodClick={handleMood}
              onCardsClick={handleCards}
            />
          </div>
        </div>
      </main>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-[#a8d61f]" />
            <span className="font-bold">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}