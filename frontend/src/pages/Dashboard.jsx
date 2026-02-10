import React from 'react';
import Navbar from '../components/Navbar';
import FileUpload from '../components/FileUpload';
import { motion } from 'framer-motion';
import { 
  IndianRupee, Landmark, ReceiptText, Wallet, 
  TrendingUp, ShieldCheck, Layout, Zap, 
  Database, DollarSign, PieChart, Coins, 
  FileCheck, CreditCard, BarChart3, Briefcase
} from 'lucide-react';

const Dashboard = () => {
  // ULTRA-HIGH DENSITY MESH
  const bgIcons = [
    { Icon: IndianRupee, top: '5%', left: '2%' }, { Icon: DollarSign, top: '8%', left: '15%' },
    { Icon: Landmark, top: '12%', left: '88%' }, { Icon: ReceiptText, top: '5%', left: '70%' },
    { Icon: Wallet, top: '25%', left: '95%' }, { Icon: TrendingUp, top: '18%', left: '5%' },
    { Icon: PieChart, top: '40%', left: '2%' }, { Icon: Coins, top: '35%', left: '92%' },
    { Icon: FileCheck, top: '60%', left: '5%' }, { Icon: CreditCard, top: '55%', left: '94%' },
    { Icon: BarChart3, top: '80%', left: '2%' }, { Icon: Briefcase, top: '85%', left: '90%' },
    { Icon: IndianRupee, top: '75%', left: '18%' }, { Icon: Zap, top: '90%', left: '50%' },
    { Icon: ShieldCheck, top: '45%', left: '15%' }, { Icon: Database, top: '30%', left: '80%' },
    { Icon: Landmark, top: '65%', left: '82%' }, { Icon: ReceiptText, top: '22%', left: '35%' },
    { Icon: Wallet, top: '48%', left: '42%' }, { Icon: TrendingUp, top: '70%', left: '60%' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden font-sans">
      
      {/* BACKGROUND MESH */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] overflow-hidden">
        {bgIcons.map((item, idx) => (
          <item.Icon 
            key={idx} 
            className="absolute text-slate-900" 
            size={idx % 3 === 0 ? 100 : 70} 
            style={{ top: item.top, left: item.left }}
          />
        ))}
      </div>

      <Navbar />

      <main className="max-w-6xl mx-auto px-8 py-24 relative z-10">
        
        <header className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-600 tracking-tighter uppercase"
          >
            Financial Intake
          </motion.h1>
        </header>

        {/* DUAL-LAYER INGESTION ZONE */}
        <div className="max-w-4xl mx-auto relative">
            {/* BACK LAYER: Translucent Shell */}
            <div className="absolute inset-x-[-45px] top-[-45px] bottom-[-170px] bg-blue-600/[0.12] backdrop-blur-3xl rounded-[6rem] border border-blue-200/60 flex flex-col justify-end p-16 shadow-[0_32px_64px_-16px_rgba(59,130,246,0.1)]">
                <div className="flex justify-between items-center px-12 mb-2">
                    {[
                      { Icon: ShieldCheck, label: "PII Redaction" },
                      { Icon: Layout, label: "Layout AI" },
                      { Icon: Zap, label: "Checksum" },
                      { Icon: Database, label: "Vault Secure" }
                    ].map((badge, i) => (
                      <div key={i} className="flex flex-col items-center gap-5 transition-transform hover:scale-105">
                        <badge.Icon className="text-blue-600 h-9 w-9" />
                        <span className="text-[11px] font-bold text-blue-900/50 uppercase tracking-[0.2em] leading-none">{badge.label}</span>
                      </div>
                    ))}
                </div>
            </div>

            {/* FRONT LAYER - THE COMPONENT */}
            <motion.section 
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10"
            >
                <FileUpload />
            </motion.section>
        </div>

        <footer className="mt-56 text-center">
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.4em]">
            Enterprise-Grade Intelligence • Secured 256-Bit Link
          </p>
        </footer>

      </main>
    </div>
  );
};

export default Dashboard;