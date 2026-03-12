import React, { useState } from "react";
import { Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisResult } from "../types";

interface AIAnalyzerProps {
  onAnalysisSuccess: (result: AnalysisResult) => void;
}

const AIAnalyzer: React.FC<AIAnalyzerProps> = ({ onAnalysisSuccess }) => {
  const [mealInput, setMealInput] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);

  const handleAnalyzeMeal = async () => {
    if (!mealInput.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/analyze-meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meal: mealInput }),
      });
      const data = await res.json();
      setAnalysis(data);
      onAnalysisSuccess(data);
      const calories = parseInt(data.calories) || 0;
      setTotal(prev => prev + calories);
    } catch (err) {
      console.error("Meal analysis failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10">
      <div className="bg-white/70 backdrop-blur-md border border-emerald-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
        <div className="bg-emerald-50 p-2 rounded-lg">
          <Utensils className="w-6 h-6 text-emerald-600" />
        </div>
        <div className="flex-1">
          <input
            value={mealInput}
            onChange={(e) => setMealInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyzeMeal()}
            className="w-full bg-transparent border-none focus:outline-none text-slate-700 placeholder:text-slate-400 font-medium"
            placeholder="Type your meal (e.g., 2 idlis and chai...)"
            type="text"
          />
        </div>
        <button
          onClick={handleAnalyzeMeal}
          disabled={loading}
          className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="bg-white border border-emerald-100 rounded-2xl p-4 flex flex-col gap-1 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase">Calorie Estimate</p>
              <p className="text-lg font-black text-slate-900">{analysis.calories} kcal</p>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl p-4 flex flex-col gap-1 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase">Health Score</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-black text-emerald-600">{analysis.healthScore}/10</p>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">
                  +15 EcoCoins earned!
                </span>
              </div>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl p-4 flex flex-col gap-1 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase">Nutrition Tip</p>
              <p className="text-sm font-medium text-slate-700">{analysis.tip}</p>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl p-4 flex flex-col gap-1 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase">Total Calories</p>
              <p className="text-lg font-black text-slate-900">{total} kcal</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAnalyzer;