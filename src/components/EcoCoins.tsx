import React from 'react';
import { Database, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserData } from '../types';

interface EcoCoinsProps {
  userData: UserData;
}

const EcoCoins: React.FC<EcoCoinsProps> = ({ userData }) => {
  const formatCurrency = (coins: number) => `Rs.${(coins / 100).toFixed(2)}`;

  return (
    <div className="flex gap-3">
      <div className="flex items-center gap-3 bg-amber-50 px-5 py-3 rounded-xl border border-amber-200 flex-col !items-start min-w-[240px]">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-amber-500 fill-current" />
          <p className="text-xs uppercase font-bold tracking-wider text-amber-700">EcoCoins</p>
        </div>
        <p className="text-xl font-black text-slate-900">
          {userData.ecoCoins.toLocaleString()} EcoCoins (≈ {formatCurrency(userData.ecoCoins)})
        </p>
        <div className="w-full mt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-amber-700">80% toward next Rs. 5 Airtime</span>
          </div>
          <div className="w-full h-1.5 bg-amber-200/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '80%' }}
              className="h-full bg-amber-500 rounded-full"
            />
          </div>
        </div>
      </div>
      <button className="bg-[#a8d61f] hover:bg-[#97c11b] text-slate-900 font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-[#a8d61f]/20">
        <Gift className="w-5 h-5" />
        Redeem Rewards
      </button>
    </div>
  );
};

export default EcoCoins;