import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LogOut, Bell, ShieldCheck } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="h-24 flex items-center justify-between px-8 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-[100]">
      
      {/* --- LEFT: LOGO & BRANDING --- */}
      <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/dashboard')}>
        {/* ZOOMED LOGO WRAPPER APPLIED HERE (scale 3.4) */}
        <div className="h-12 w-12 rounded-xl shadow-sm border border-slate-100 overflow-hidden shrink-0">
           <img 
             src={logo} 
             alt="Plutus" 
             className="h-full w-full object-cover scale-[3.4]" 
           />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none group-hover:text-blue-600 transition-colors">
            DASHBOARD
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-1">
            FINANCIAL INTAKE
          </span>
        </div>
      </div>

      {/* --- RIGHT: USER PROFILE & LOGOUT --- */}
      <div className="flex items-center gap-8">
        <button className="text-slate-300 hover:text-blue-600 transition-colors">
             <Bell className="h-6 w-6" />
        </button>
        
        <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
                <p className="text-sm font-black text-slate-900 uppercase leading-none">{user?.displayName || "Auditor"}</p>
                <div className="flex items-center gap-1 mt-1 justify-end text-emerald-600">
                    <ShieldCheck size={10} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Authorized Session</span>
                </div>
            </div>
            
            {/* GOOGLE DP FIX APPLIED HERE (referrerPolicy) */}
            <div className="h-12 w-12 rounded-full border-2 border-white shadow-xl overflow-hidden ring-2 ring-slate-100 flex items-center justify-center bg-slate-50">
                {user?.photoURL ? (
                    <img 
                        src={user.photoURL} 
                        alt="User" 
                        referrerPolicy="no-referrer" 
                        className="h-full w-full object-cover" 
                    />
                ) : (
                    <span className="text-lg font-black text-slate-400 uppercase">
                        {user?.displayName ? user.displayName.charAt(0) : "?"}
                    </span>
                )}
            </div>
        </div>

        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout} 
            className="px-6 py-2.5 rounded-2xl bg-[#0F172A] text-white text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg hover:bg-rose-600 hover:shadow-rose-500/25"
        >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
        </motion.button>
      </div>

    </nav>
  );
};

export default Navbar;