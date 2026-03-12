import React from 'react';
import { Globe, Utensils, ShieldCheck, User, Droplets, Recycle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SDGImpactProps {
  unlockedSDGs: number[];
}

const sdgs = [
  { id: 2, name: "Book Surplus Food", icon: Utensils, color: "text-orange-500", border: "border-orange-500" },
  { id: 3, name: "Daily Habit", icon: ShieldCheck, color: "text-emerald-600", border: "border-emerald-500" },
  { id: 5, name: "Finish Learn Cards", icon: User, color: "text-pink-600", border: "border-pink-500" },
  { id: 6, name: "Reach Water Goal", icon: Droplets, color: "text-blue-500", border: "border-blue-500" },
  { id: 12, name: "Clean Plate Streak", icon: Recycle, color: "text-amber-600", border: "border-amber-500" },
];

const SDGImpact: React.FC<SDGImpactProps> = ({ unlockedSDGs }) => {
  return (
    <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Globe className="w-6 h-6 text-[#a8d61f]" />
          SDG Impact Journey
        </h3>
        <span className="text-sm font-medium text-slate-400">Global Progress • Tier 2</span>
      </div>
      <div className="flex flex-wrap justify-center gap-8 py-6">
        {sdgs.map((sdg) => {
          const isActive = unlockedSDGs.includes(sdg.id);
          return (
            <div
              key={sdg.id}
              className={cn(
                "flex flex-col items-center gap-2 text-center transition-all duration-500",
                !isActive && "grayscale opacity-40"
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                isActive ? cn(sdg.border, "bg-white shadow-lg") : "border-slate-300"
              )}>
                <sdg.icon className={cn("w-8 h-8", isActive ? sdg.color : "text-slate-400")} />
              </div>
              <span className={cn("text-[10px] font-bold uppercase", isActive ? sdg.color : "text-slate-400")}>
                SDG {sdg.id}
              </span>
              <span className={cn("text-xs font-bold max-w-[80px]", isActive ? "text-slate-700" : "text-slate-400")}>
                {sdg.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SDGImpact;