import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AIAnalyzer from './components/AIAnalyzer';
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
    showToast("+15 EcoCoins earned!");
    fetchDashboard();
  };

  if (!userData || !habitData) return null;

  return (
    <div className="min-h-screen bg-[#f7f8f6] font-display text-slate-900">
      <Header userData={userData} />

      <main className="max-w-[1400px] mx-auto w-full p-6 lg:p-10">
        <AIAnalyzer onAnalysisSuccess={handleAnalysisSuccess} />
      </main>
    </div>
  );
}