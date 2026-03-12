import React, { useState } from 'react';
import { Leaf, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'user' | 'vendor') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [role, setRole] = useState<'user' | 'vendor'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLogged, setKeepLogged] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = () => {
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-[#f0f2eb] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#a8d61f] rounded-full flex items-center justify-center">
            <Leaf className="w-5 h-5 text-slate-900 fill-current" />
          </div>
          <span className="font-extrabold text-slate-900 text-lg">GreenLife</span>
        </div>
        <button className="px-5 py-2 rounded-full border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-white transition-colors">
          About Us
        </button>
      </header>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 w-full max-w-md p-8">
          <h1 className="text-3xl font-black text-slate-900 text-center mb-1">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-slate-400 text-center text-sm mb-6">
            {isSignUp ? 'Join GreenLife and start your eco journey' : 'Sign in to your GreenLife account to continue'}
          </p>

          {/* Role Toggle */}
          <div className="flex bg-slate-100 rounded-full p-1 mb-6">
            <button
              onClick={() => setRole('user')}
              className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${role === 'user' ? 'bg-white shadow text-slate-900' : 'text-slate-400'}`}
            >
              I am a Student/User
            </button>
            <button
              onClick={() => setRole('vendor')}
              className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${role === 'vendor' ? 'bg-white shadow text-slate-900' : 'text-slate-400'}`}
            >
              I am a Vendor
            </button>
          </div>

          {/* Name field for signup */}
          {isSignUp && (
            <div className="mb-4">
              <label className="text-sm font-semibold text-slate-700 mb-1 block">
                {role === 'vendor' ? 'Business Name' : 'Full Name'}
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 gap-3">
                <span className="text-slate-400 text-sm font-bold">👤</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:outline-none text-slate-700 text-sm"
                  placeholder={role === 'vendor' ? 'Your restaurant or store name' : 'Your full name'}
                  type="text"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-slate-700 mb-1 block">Email Address</label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 gap-3">
              <Mail className="w-4 h-4 text-slate-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border-none focus:outline-none text-slate-700 text-sm"
                placeholder="nature@greenlife.com"
                type="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              {!isSignUp && (
                <button className="text-xs font-bold text-[#a8d61f] hover:underline">Forgot password?</button>
              )}
            </div>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 gap-3">
              <Lock className="w-4 h-4 text-slate-400" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent border-none focus:outline-none text-slate-700 text-sm"
                placeholder="••••••••"
                type={showPassword ? 'text' : 'password'}
              />
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
          </div>

          {/* Vendor extra fields */}
          {isSignUp && role === 'vendor' && (
            <div className="mb-4">
              <label className="text-sm font-semibold text-slate-700 mb-1 block">Business Address</label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 gap-3">
                <span className="text-slate-400 text-sm">📍</span>
                <input
                  className="flex-1 bg-transparent border-none focus:outline-none text-slate-700 text-sm"
                  placeholder="123 Green Street, Eco City"
                  type="text"
                />
              </div>
            </div>
          )}

          {/* Keep logged in */}
          {!isSignUp && (
            <div className="flex items-center gap-2 mb-6">
              <input
                id="keep"
                type="checkbox"
                checked={keepLogged}
                onChange={(e) => setKeepLogged(e.target.checked)}
                className="w-4 h-4 accent-[#a8d61f]"
              />
              <label htmlFor="keep" className="text-sm text-slate-500">Keep me logged in</label>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#a8d61f] hover:bg-[#97c11b] text-slate-900 font-black py-4 rounded-2xl text-base transition-all shadow-lg shadow-[#a8d61f]/20 mb-4"
          >
            {isSignUp ? (role === 'vendor' ? 'Create Vendor Account' : 'Sign Up') : 'Sign In'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Social */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Apple
            </button>
          </div>

          {/* Toggle */}
          <p className="text-center text-sm text-slate-400">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#a8d61f] font-bold hover:underline"
            >
              {isSignUp ? 'Sign in' : 'Sign up for free'}
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-slate-400">
        © 2024 GreenLife Eco-System. All rights reserved.
        <span className="mx-2">|</span>
        <a href="#" className="hover:text-slate-600">Privacy Policy</a>
        <span className="mx-2">|</span>
        <a href="#" className="hover:text-slate-600">Terms of Service</a>
      </footer>
    </div>
  );
};

export default Login;