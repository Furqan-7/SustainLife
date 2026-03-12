import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Store, ChevronRight, Leaf, Globe, ShieldCheck } from 'lucide-react';
import Login from './components/Login';
import Header from './components/Header';
import AIAnalyzer from './components/AIAnalyzer';
import EcoCoins from './components/EcoCoins';
import SDGImpact from './components/SDGImpact';
import DailyQuests from './components/DailyQuests';
import HydrationTracker from './components/HydrationTracker';
import MealCard from './components/MealCard';
import { UserData, HabitData, AnalysisResult } from './types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'vendor'>('user');
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
    if (isLoggedIn) fetchDashboard();
  }, [isLoggedIn]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (role: 'user' | 'vendor') => {
    setUserRole(role);
    setIsLoggedIn(true);
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

  const handleWater = async (amount: number) => {
    try {
      const res = await fetch('/api/habit/water', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      const data = await res.json();
      setUserData(data.user);
      setHabitData(data.habit);
      showToast(`+5 EcoCoins! Hydration +${amount}ml`);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;
  if (!userData || !habitData) return null;

  return (
    <div className="min-h-screen bg-[#f7f8f6] font-display text-slate-900">
      <Header userData={userData} />

      <main className="max-w-[1400px] mx-auto w-full p-6 lg:p-10">
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

        <div className="grid grid-cols-12 gap-6">
          <SDGImpact unlockedSDGs={userData.unlockedSDGs} />

          <div className="col-span-12 lg:col-span-4">
            <DailyQuests
              habitData={habitData}
              onMoodClick={handleMood}
              onCardsClick={handleCards}
            />
          </div>

          <div className="col-span-12 lg:col-span-8">
            <HydrationTracker
              waterIntake={habitData.waterIntake}
              onAddWater={handleWater}
            />
          </div>

          <div className="col-span-12 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Store className="w-6 h-6 text-orange-500" />
                  Surplus Food Marketplace
                </h3>
                <p className="text-slate-400 text-sm">Save delicious meals, prevent waste, and earn EcoCoins.</p>
              </div>
              <button className="text-[#a8d61f] font-bold hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MealCard title="Green Garden Bowl" vendor="Green Bowl Cafe" price={25} originalPrice={60} left={5} image="https://lh3.googleusercontent.com/aida-public/AB6AXuC6wH-7TJwDVmoshfDCRJDOQ3NJO-f55vzVWyx6FTh6twLW3lvJj3p_lE078Jn9NmFvBe-9ExrLEUc5n47BSdghA6EWITbgGByyOiwEZtOmYqvGfTGEACGeqB6yb_mi9eEhxJ4lrUtIXmJjFjXR0GBiAWzeSmJGUUHEayLTs7BszU4tyWujdHtLbuyNLP3IR_R20g6iDPJIKDz2UgTMis-bZ7j3fSXoZAMynkoD9xayXVSvqehZY6UWEnV5IsuaHlZu7KFKAQE45z4" />
              <MealCard title="Artisan Salmon Box" vendor="The Bistro Quay" price={80} originalPrice={180} left={2} image="https://lh3.googleusercontent.com/aida-public/AB6AXuAuMpmTdW3y-6qwsDUebQxh2mcoPRbE-xakxMdURPBQRo4afizqHKi3MOnkdkpifSoddT91LIVPHbWa2oat2n43gRvptbXPQA_gzAwohhhlCKyT0eKJm286BgkEVR4ea5vrGr9u6hahJeagYAcl-Ig4dbI-jxxc1bhiXPLGz8iY-WlLaK_-xh7VBDZHMK2oAI9mFw8lwGceb9MfJsFGscboFGctzQeLxwkXpBRQfIeAyzcpILrZpx5epoWyYnsU4gdWcuh1u5eFHXI" />
              <MealCard title="Pastry Surprise Bag" vendor="Flour Power Bakery" price={40} originalPrice={100} left={12} image="https://lh3.googleusercontent.com/aida-public/AB6AXuBH2Vz5J8GBalQdw0HZj-O3u6nFbmau9yXtWE5pjEzcnLFlzpAsJdYcbuvTxymxU9bzzqyTx9mdvISW14wap5mlmGaQmIlOba6lvq7gBXj56dQ20UNBYG2fXv9yQqVfXcsntdS9ZuRBADIZZk8h4ICVF2YXN5p7sp3T88lju5HwduPSbpyPviiPoigJxV1iql1F1niRQmUHuyF1r-TAiTfFmwu6XYOQxabfLDg6pmzY_wvMBHXaCla7aeCf22jgUos3LLlvQf-AbOo" />
              <MealCard title="Zen Tofu Bowl" vendor="Umami Hub" price={65} originalPrice={140} left={0} image="https://lh3.googleusercontent.com/aida-public/AB6AXuC-c_WzjjCyT9MzeQWsfqri4rT-ll3KBYIxWEAwhruXTNTFpyJg0f1fml5L0qlsagGq3R5kgiMmPFcIGurDS47b4xp_z7Qvv6Ml8reMN-FRh3fszn9g3AzsLk8xGCf7jitISoQwMHBv9KVq0v4tIauJYpesFQAU_8N7gdXfO1D_KWJwc9IZuU2VxI3G1UYGXzDZXYgwOG8MLeVNH7BtFIkz5JdYAe6rKlwS0BpR23xfLbxUynCdDfMIoHBLzFdq_tgG5w0BMVqRDxM" />
            </div>
          </div>
        </div>
      </main>

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

         <footer className="max-w-[1400px] mx-auto w-full px-6 lg:px-10 py-12 border-t border-slate-200 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Leaf className="w-5 h-5 text-[#a8d61f]" />
            <span className="font-bold tracking-tight">GreenLife © 2024</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <a className="hover:text-[#a8d61f]" href="#">Privacy Policy</a>
            <a className="hover:text-[#a8d61f]" href="#">Impact Report 2023</a>
            <a className="hover:text-[#a8d61f]" href="#">Merchant Portal</a>
            <a className="hover:text-[#a8d61f]" href="#">Support</a>
          </div>
          <div className="flex gap-4">
            <Globe className="w-5 h-5 text-slate-400 hover:text-[#a8d61f] cursor-pointer" />
            <ShieldCheck className="w-5 h-5 text-slate-400 hover:text-[#a8d61f] cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}