import React from 'react';
import { Leaf, Search, Flame, Bell, Settings } from 'lucide-react';
import { UserData } from '../types';

interface HeaderProps {
  userData: UserData;
}

const Header: React.FC<HeaderProps> = ({ userData }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 lg:px-20 py-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-[#a8d61f]">
            <Leaf className="w-8 h-8 fill-current" />
            <h2 className="text-slate-900 text-xl font-extrabold tracking-tight">SustainLife</h2>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-slate-900 font-semibold border-b-2 border-[#a8d61f] pb-1" href="#">Dashboard</a>
            <a className="text-slate-500 hover:text-[#a8d61f] transition-colors" href="#">Marketplace</a>
            <a className="text-slate-500 hover:text-[#a8d61f] transition-colors" href="#">Wallet</a>
            <a className="text-slate-500 hover:text-[#a8d61f] transition-colors" href="#">Impact</a>
            <a className="text-slate-500 hover:text-[#a8d61f] transition-colors" href="#">Community</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-[#f7f8f6] rounded-xl px-3 py-1.5 border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input 
              className="bg-transparent border-none focus:outline-none text-sm w-32 lg:w-48 placeholder:text-slate-400" 
              placeholder="Search..." 
              type="text" 
            />
          </div>
          <div className="hidden lg:flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1.5 rounded-xl border border-orange-200">
            <Flame className="w-4 h-4 fill-current" />
            <span className="font-bold text-sm">{userData.streak}-Day Streak</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-xl bg-[#f7f8f6] hover:bg-slate-200 transition-colors text-slate-600">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-xl bg-[#f7f8f6] hover:bg-slate-200 transition-colors text-slate-600">
              <Settings className="w-5 h-5" />
            </button>
            <div 
              className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-[#a8d61f]" 
              style={{ backgroundImage: 'url("https://picsum.photos/seed/priya/100/100")' }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
