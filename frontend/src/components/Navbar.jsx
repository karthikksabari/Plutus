import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Bell, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // DYNAMIC TITLE LOGIC
  const getPageTitle = () => {
    if (location.pathname === '/report') return 'FORENSIC LAB';
    return 'DASHBOARD';
  };

  const getSubTitle = () => {
    if (location.pathname === '/report') return 'CASE ID: #2026-X99';
    return 'FINANCIAL INTAKE';
  };

  return (
    <nav className="h-24 flex items-center justify-between px-12 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-[100]">
      
      {/* LEFT: BLUNT LOGO + DYNAMIC TEXT */}
      <div className="flex items-center gap-5">
        {/* Logo Alone - No Box, Just Curvy Edges */}
        <img 
          src={logo} 
          alt="Plutus" 
          className="h-14 w-14 object-cover rounded-2xl shadow-sm" 
        />
        
        <div className="flex flex-col">
            <motion.span 
              key={location.pathname} // Animate on change
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none"
            >
              {getPageTitle()}
            </motion.span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-1">
              {getSubTitle()}
            </span>
        </div>
      </div>

      {/* RIGHT: PROFILE & LOGOUT */}
      <div className="flex items-center gap-10">
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
          {user?.photoURL && (
             <div className="h-12 w-12 rounded-full border-2 border-white shadow-xl overflow-hidden ring-2 ring-slate-100 transition-transform hover:scale-105">
               <img src={user.photoURL} alt="User" className="h-full w-full object-cover" />
             </div>
          )}
        </div>

        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: "#DC2626", color: "#FFFFFF", borderColor: "#EF4444" }}
          whileTap={{ scale: 0.95 }}
          onClick={logout} 
          className="px-6 py-2.5 rounded-2xl bg-[#0F172A] text-white text-[10px] font-bold uppercase tracking-widest border border-transparent transition-all flex items-center gap-2 shadow-lg"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;