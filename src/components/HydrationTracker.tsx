import React from 'react';
import { Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

interface HydrationTrackerProps {
  waterIntake: number;
  onAddWater: (amount: number) => void;
}

const HydrationTracker: React.FC<HydrationTrackerProps> = ({ waterIntake, onAddWater }) => {
  const progress = Math.min((waterIntake / 3000) * 100, 100);

  return (
    <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-8 h-full">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="font-bold text-lg">Hydration Goal</h3>
          <p className="text-blue-600 font-medium">Keep it flowing!</p>
        </div>
        <Droplets className="w-8 h-8 text-blue-500" />
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-full h-12 bg-white rounded-full overflow-hidden border border-blue-100 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-blue-400/30"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-black text-blue-900">
              {(waterIntake / 1000).toFixed(1)}L / 3.0L
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => onAddWater(250)}
            className="px-4 py-2 rounded-xl bg-white border border-blue-100 text-blue-600 hover:bg-blue-50 transition-colors shadow-sm font-bold text-sm"
          >
            +250ml
          </button>
          <button
            onClick={() => onAddWater(500)}
            className="px-4 py-2 rounded-xl bg-white border border-blue-100 text-blue-600 hover:bg-blue-50 transition-colors shadow-sm font-bold text-sm"
          >
            +500ml
          </button>
        </div>
      </div>
    </div>
  );
};

export default HydrationTracker;