import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  IndianRupee, Landmark, ReceiptText, Wallet, 
  TrendingUp, DollarSign, PieChart, ShieldCheck, 
  Lock, ArrowRight, Zap, Globe, Coins, FileCheck,
  BarChart3, Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // AUTO-REDIRECT LOGIC
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // DENSE FINANCE MESH BACKGROUND
  const bgIcons = [
    { Icon: IndianRupee, top: '5%', left: '5%' }, { Icon: DollarSign, top: '12%', left: '15%' },
    { Icon: Globe, top: '8%', left: '35%' }, { Icon: ReceiptText, top: '20%', left: '2%' },
    { Icon: Landmark, top: '25%', left: '25%' }, { Icon: TrendingUp, top: '35%', left: '10%' },
    { Icon: Coins, top: '50%', left: '5%' }, { Icon: PieChart, top: '65%', left: '15%' },
    { Icon: Wallet, top: '80%', left: '2%' }, { Icon: IndianRupee, top: '90%', left: '20%' },
    { Icon: BarChart3, top: '5%', left: '65%' }, { Icon: FileCheck, top: '15%', left: '85%' },
    { Icon: DollarSign, top: '10%', left: '95%' }, { Icon: Briefcase, top: '25%', left: '75%' },
    { Icon: Globe, top: '40%', left: '92%' }, { Icon: Zap, top: '55%', left: '80%' },
    { Icon: Landmark, top: '70%', left: '95%' }, { Icon: Coins, top: '85%', left: '70%' },
    { Icon: ShieldCheck, top: '92%', left: '90%' }, { Icon: ReceiptText, top: '45%', left: '60%' },
  ];

  return (
    // HARD-LOCKED VIEWPORT
    <div className="h-screen w-screen bg-[#F8FAFC] font-sans relative flex flex-col items-center justify-center overflow-hidden">
      
      {/* --- BACKGROUND MESH --- */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        {bgIcons.map((item, idx) => (
          <item.Icon key={idx} className="absolute text-slate-900" size={80} style={{ top: item.top, left: item.left }} />
        ))}
      </div>

      {/* --- BRANDING UNIT --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-6 mb-12 relative z-10"
      >
        <img 
          src={logo} 
          alt="Plutus" 
          className="h-20 w-20 object-cover rounded-2xl shadow-xl border border-slate-100" 
        />
        <h1 className="text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">Plutus</h1>
      </motion.div>

      {/* --- SIGN-IN PORTAL --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl relative z-10 px-6"
      >
        {/* AZURE TRANSLUCENT SHELL */}
        <div className="absolute inset-x-[-30px] inset-y-[-30px] bg-blue-600/[0.06] backdrop-blur-3xl rounded-[4rem] -z-10 border border-blue-200/40 shadow-2xl" />
        
        <div className="bg-white rounded-[3.5rem] p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-slate-100 text-center relative overflow-hidden">
          
          <div className="mb-12 relative z-10">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-3">Welcome Back</h2>
            <p className="text-lg text-slate-500 font-medium">Access your secure forensic dashboard.</p>
          </div>

          {/* THE BUTTON: Substantial Size (h-24) + Decreased Radius (rounded-[2rem]) */}
          <motion.button 
            whileHover={{ 
              scale: 1.01, 
              borderColor: "#2563EB", 
              boxShadow: "0 20px 40px -10px rgba(37,99,235,0.2)" 
            }}
            whileTap={{ scale: 0.99 }}
            onClick={login}
            // h-24 = Substantial Height | rounded-[2rem] = Decreased Radius (Soft Block)
            className="w-full flex items-center justify-between px-10 bg-white border-2 border-slate-200 h-24 rounded-[2rem] transition-all duration-300 group shadow-sm relative z-10"
          >
            <div className="flex items-center gap-6">
              <img 
                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" 
                alt="Google" 
                className="h-8 w-8 transition-transform group-hover:rotate-12" 
              />
              <span className="text-xl font-black uppercase tracking-widest text-slate-900 group-hover:text-blue-600 transition-colors">
                Continue with Google
              </span>
            </div>
            {/* ARROW ICON */}
            <ArrowRight size={28} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </motion.button>

          {/* FOOTER INDICATORS */}
          <div className="mt-12 flex justify-between items-center border-t border-slate-100 pt-8 px-4 relative z-10">
            <div className="flex items-center gap-2 text-emerald-600">
               <ShieldCheck size={16} />
               <span className="text-[10px] font-black uppercase tracking-widest">Bank-Grade Ingestion</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
               <Zap size={16} />
               <span className="text-[10px] font-black uppercase tracking-widest">AI-Native Forensic Core</span>
            </div>
          </div>

        </div>
      </motion.div>

      {/* --- FOOTER --- */}
      <footer className="mt-16 relative z-10 flex items-center gap-2 text-slate-300">
         <Lock size={12} />
         <p className="text-[10px] font-black uppercase tracking-[0.4em]">Secured 256-Bit Link</p>
      </footer>
    </div>
  );
};

export default Login;