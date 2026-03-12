import React, { useState } from 'react';
import { Leaf, Search, Settings, BarChart2, Package, Plus, Minus } from 'lucide-react';

interface Listing {
  id: number;
  name: string;
  originalPrice: number;
  discountPrice: number;
  available: number;
  booked: number;
  status: 'LIVE' | 'SOLD OUT';
  listedAgo: string;
}

const VendorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Live' | 'Sold'>('All');
  const [itemName, setItemName] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pickupSlot, setPickupSlot] = useState('6:00 PM - 8:00 PM');

  const [listings, setListings] = useState<Listing[]>([
    { id: 1, name: 'Mixed Bakery Bag', originalPrice: 800, discountPrice: 249, available: 12, booked: 8, status: 'LIVE', listedAgo: '2h ago' },
    { id: 2, name: 'Organic Salad Bowls', originalPrice: 350, discountPrice: 149, available: 5, booked: 5, status: 'SOLD OUT', listedAgo: '4h ago' },
    { id: 3, name: 'Dim Sum Surplus Tray', originalPrice: 1200, discountPrice: 599, available: 4, booked: 1, status: 'LIVE', listedAgo: '10m ago' },
  ]);

  const filteredListings = listings.filter(l => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Live') return l.status === 'LIVE';
    if (activeTab === 'Sold') return l.status === 'SOLD OUT';
  });

  const handlePublish = () => {
    if (!itemName || !originalPrice || !discountPrice) return;
    const newListing: Listing = {
      id: Date.now(),
      name: itemName,
      originalPrice: parseInt(originalPrice),
      discountPrice: parseInt(discountPrice),
      available: quantity,
      booked: 0,
      status: 'LIVE',
      listedAgo: 'Just now'
    };
    setListings(prev => [newListing, ...prev]);
    setItemName('');
    setOriginalPrice('');
    setDiscountPrice('');
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-[#f0f2eb] font-display">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 lg:px-10 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#a8d61f] rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-slate-900 fill-current" />
              </div>
              <span className="font-extrabold text-slate-900 text-lg">GreenLife Merchant</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-slate-900 font-semibold border-b-2 border-[#a8d61f] pb-1" href="#">Dashboard</a>
              <a className="text-slate-500 hover:text-[#a8d61f] transition-colors" href="#">Inventory</a>
              <a className="text-slate-500 hover:text-[#a8d61f] transition-colors" href="#">Orders</a>
              <a className="text-slate-500 hover:text-[#a8d61f] transition-colors" href="#">Analytics</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-slate-100 rounded-xl px-3 py-2 border border-slate-200">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input className="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-slate-400" placeholder="Search orders..." type="text" />
            </div>
            <div className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-[#a8d61f]" style={{ backgroundImage: 'url("https://picsum.photos/seed/vendor/100/100")' }} />
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
        {/* Merchant Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#a8d61f] bg-[#a8d61f]/10 px-3 py-1 rounded-full">Verified Partner</span>
            <h1 className="text-4xl font-black text-slate-900 mt-2">Forest Greens Cafe</h1>
            <p className="text-slate-400 text-sm mt-1">Merchant ID: #GL-88392 • New Delhi, IN</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors">
              <Settings className="w-4 h-4" /> Shop Settings
            </button>
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#a8d61f] text-slate-900 font-bold text-sm hover:bg-[#97c11b] transition-colors shadow-lg shadow-[#a8d61f]/20">
              <BarChart2 className="w-4 h-4" /> Quick Report
            </button>
          </div>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Live Stats */}
          <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-4">
              <BarChart2 className="w-5 h-5 text-[#a8d61f]" /> Live Stats
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Saved</p>
                <p className="text-3xl font-black text-slate-900">124kg</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Active Items</p>
                <p className="text-3xl font-black text-slate-900">0{listings.filter(l => l.status === 'LIVE').length}</p>
              </div>
            </div>
            <div className="bg-[#a8d61f]/10 rounded-2xl p-4 flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#a8d61f]/20 rounded-full flex items-center justify-center">
                <BarChart2 className="w-4 h-4 text-[#a8d61f]" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500">Revenue this month</p>
                <p className="text-xl font-black text-slate-900">Rs. 14,250</p>
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-4">
              <h4 className="font-bold text-white mb-1">Impact Score</h4>
              <p className="text-slate-400 text-xs mb-3">You've reached 'Silver' tier sustainability partner status.</p>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-[#a8d61f] rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
          </div>

          {/* Post Surplus */}
          <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 mb-1">Post Surplus</h3>
            <p className="text-slate-400 text-sm mb-6">List items that are near expiry or surplus to reach local buyers.</p>

            <div className="mb-4">
              <label className="text-sm font-bold text-slate-700 mb-1 block">Item Name</label>
              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#a8d61f] transition-colors"
                placeholder="e.g. Sourdough Pastry Box (Pack of 4)"
                type="text"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1 block">Original Price (Rs.)</label>
                <input
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#a8d61f] transition-colors"
                  placeholder="450"
                  type="number"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1 block">Discount Price (Rs.)</label>
                <input
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#a8d61f] transition-colors"
                  placeholder="199"
                  type="number"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1 block">Quantity Available</label>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center font-black text-slate-900">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1 block">Pick-up Slot</label>
                <select
                  value={pickupSlot}
                  onChange={(e) => setPickupSlot(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-[#a8d61f] transition-colors bg-white"
                >
                  <option>6:00 PM - 8:00 PM</option>
                  <option>8:00 AM - 10:00 AM</option>
                  <option>12:00 PM - 2:00 PM</option>
                  <option>4:00 PM - 6:00 PM</option>
                </select>
              </div>
            </div>

            <button
              onClick={handlePublish}
              className="w-full bg-[#a8d61f] hover:bg-[#97c11b] text-slate-900 font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#a8d61f]/20"
            >
              <Package className="w-5 h-5" /> Publish Listing
            </button>
          </div>
        </div>

        {/* Active Listings */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-slate-900">Active Listings</h3>
            <div className="flex gap-2">
              {(['All', 'Live', 'Sold'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${activeTab === tab ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-100">
                <th className="text-left pb-3">Item Details</th>
                <th className="text-left pb-3">Price (Org/Disc)</th>
                <th className="text-left pb-3">Available</th>
                <th className="text-left pb-3">Booked</th>
                <th className="text-left pb-3">Status</th>
                <th className="text-left pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredListings.map((listing) => (
                <tr key={listing.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Package className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{listing.name}</p>
                        <p className="text-xs text-slate-400">Listed {listing.listedAgo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <p className="text-xs text-slate-400 line-through">Rs. {listing.originalPrice}</p>
                    <p className="font-black text-[#a8d61f]">Rs. {listing.discountPrice}</p>
                  </td>
                  <td className="py-4 text-sm font-bold text-slate-700">{String(listing.available).padStart(2, '0')} units</td>
                  <td className="py-4 text-sm font-bold text-slate-700">{String(listing.booked).padStart(2, '0')} units</td>
                  <td className="py-4">
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${listing.status === 'LIVE' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                      {listing.status === 'LIVE' && <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1 mb-0.5" />}
                      {listing.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-slate-400 hover:text-slate-700 transition-colors">⋯</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 border-t border-slate-200 mt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Leaf className="w-4 h-4 text-[#a8d61f]" />
            <span>GreenLife Merchant Support: support@greenlife.com</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-[#a8d61f]">Merchant Terms</a>
            <a href="#" className="hover:text-[#a8d61f]">Payout Settings</a>
            <a href="#" className="hover:text-[#a8d61f]">Sustainability Report 2024</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VendorDashboard;