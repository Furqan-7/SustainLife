import React from 'react';
import { ChevronRight } from 'lucide-react';

interface MealCardProps {
  title: string;
  vendor: string;
  price: number;
  originalPrice: number;
  left: number;
  image: string;
}

const MealCard: React.FC<MealCardProps> = ({ title, vendor, price, originalPrice, left, image }) => {
  return (
    <div className="group bg-[#f7f8f6] rounded-2xl overflow-hidden border border-slate-200 transition-transform hover:-translate-y-1">
      <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: `url("${image}")` }}>
        {left > 0 ? (
          <div className="absolute top-2 left-2 bg-[#a8d61f] text-slate-900 text-[10px] font-black uppercase px-2 py-1 rounded-full">{left} Left</div>
        ) : (
          <div className="absolute top-2 left-2 bg-slate-400 text-white text-[10px] font-black uppercase px-2 py-1 rounded-full">Sold Out</div>
        )}
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-sm font-bold">
          Rs.{price} <span className="text-slate-400 line-through text-xs ml-1">Rs.{originalPrice}</span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-slate-900">{title}</h4>
        <p className="text-xs text-slate-400 mb-3">{vendor}</p>
        <button
          disabled={left === 0}
          className="w-full bg-slate-900 text-white py-2 rounded-xl text-sm font-bold group-hover:bg-[#a8d61f] group-hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:group-hover:bg-slate-900 disabled:group-hover:text-white"
        >
          {left === 0 ? 'Sold Out' : 'Book & Get QR'}
        </button>
      </div>
    </div>
  );
};

export default MealCard;