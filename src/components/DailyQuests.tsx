import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { HabitData } from '../types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DailyQuestsProps {
  habitData: HabitData;
  onMoodClick: () => void;
  onCardsClick: () => void;
}

const DailyQuests: React.FC<DailyQuestsProps> = ({ habitData, onMoodClick, onCardsClick }) => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm h-full">
      <h4 className="text-sm font-black uppercase text-slate-400 mb-4">Daily Quests</h4>
      <div className="space-y-4">
        <QuestItem label="Log Meal via AI" reward="+15" completed={habitData.mealLogged} />
        <QuestItem label="Drink 3L Water" reward="+30" completed={habitData.waterIntake >= 3000} />
        <QuestItem label="Mood Check-in" reward="+10" completed={habitData.moodLogged} onClick={onMoodClick} />
        <QuestItem label="3 Learn Cards" reward="+20" completed={habitData.cardsRead >= 3} onClick={onCardsClick} progress={`${habitData.cardsRead}/3`} />
      </div>
    </div>
  );
};

interface QuestItemProps {
  label: string;
  reward: string;
  completed: boolean;
  onClick?: () => void;
  progress?: string;
}

const QuestItem: React.FC<QuestItemProps> = ({ label, reward, completed, onClick, progress }) => {
  const handleClick = () => {
    if (!completed && onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-center gap-3 p-1 rounded-lg transition-colors",
        !completed && onClick && "cursor-pointer hover:bg-slate-50",
        completed && "cursor-default pointer-events-none"
      )}
    >
      {completed ? (
        <CheckCircle2 className="w-5 h-5 text-[#a8d61f]" />
      ) : (
        <Circle className="w-5 h-5 text-slate-300" />
      )}
      <div className="flex flex-col">
        <span className={cn("text-xs font-bold", completed ? "text-slate-400 line-through" : "text-slate-700")}>
          {label} {progress && <span className="text-slate-400 ml-1">({progress})</span>}
        </span>
        <span className="text-[10px] text-emerald-600 font-bold">{reward} EcoCoins</span>
      </div>
    </div>
  );
};

export default DailyQuests;