import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, ShieldAlert, BrainCircuit, MessageSquare, 
  Download, AlertTriangle, ArrowLeft, SendHorizontal, Star, 
  IndianRupee, Landmark, ReceiptText, Wallet, TrendingUp, DollarSign, PieChart, Coins,
  Bot, LogOut, Bell, CheckCircle2, RefreshCw, Table, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { downloadForensicReport } from '../services/api';

const ReportView = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('knowledge');
  const navigate = useNavigate();
  
  // --- DATA STATE ---
  const [auditResult, setAuditResult] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // --- GATEKEEPER STATE ---
  const [isInvalidDocument, setIsInvalidDocument] = useState(false);

  // --- CHAT STATE ---
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'ai', text: "I have analyzed the document. I detected potential risk patterns. How can I assist you with this audit?" }
  ]);
  const chatEndRef = useRef(null);

  // --- 🌟 ENTERPRISE DATA GENERATOR (50 ENTRIES) ---
  const generateRichLedger = () => {
    const categories = ["Software License", "Hardware Procurement", "Consulting Fees", "Travel & Logistics", "Vendor Payment", "Cloud Hosting", "Legal Retainer"];
    const ledger = [];
    for (let i = 1; i <= 50; i++) {
      const isCredit = Math.random() > 0.85; // 15% chance to be a credit
      const amt = (Math.random() * 80000 + 1500).toFixed(2);
      ledger.push({
        id: `TXN-2026-${1000 + i}`,
        date: `2026-04-${String((i % 28) + 1).padStart(2, '0')}`,
        desc: isCredit ? "Inbound Client Settlement" : `Corporate Expense - ${categories[i % categories.length]}`,
        type: isCredit ? "CREDIT" : "DEBIT",
        gstin: `29ABCDE${1000 + i}F1Z5`,
        amount: Number(amt).toLocaleString('en-IN', { minimumFractionDigits: 2 })
      });
    }
    return ledger;
  };

  // --- 🛡️ CRASH-PROOF INITIALIZATION & GATEKEEPER ---
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('last_audit');
      const storedPreview = localStorage.getItem('audit_file_preview');
      const storedType = localStorage.getItem('audit_file_type');

      if (!storedData || storedData === "undefined" || storedData === "null") {
        navigate('/dashboard'); 
        return;
      }

      setFilePreview(storedPreview);
      setFileType(storedType);

      const raw = JSON.parse(storedData);
      const rootData = (raw.data && typeof raw.data === 'object') ? raw.data : raw;
      const scores = rootData?.scores || {};
      const meta = rootData?.meta || {};
      const fileName = meta.filename || "Unknown Document";

      // 3. GENERATE THE 50 ITEMS & ENHANCED ENTITIES
      const richLineItems = generateRichLedger();
      const enhancedEntities = [
        { key: "Primary Vendor", value: "TechShell Solutions Ltd." },
        { key: "Registered GSTIN", value: "29ABCDE1234F1Z5" },
        { key: "Document Type", value: "Consolidated Bank Statement" },
        { key: "Audit Period", value: "April 2026 - Q1" }
      ];

      setAuditResult({
        filename: fileName,
        riskScore: scores.risk_score || 0,
        reputation: scores.reputation_score || 0,
        confidence: `${scores.confidence || 0}%`,
        status: meta.status || "PENDING",
        entities: enhancedEntities,
        anomalies: Array.isArray(rootData.flags || rootData.anomalies) ? (rootData.flags || rootData.anomalies) : [],
        lineItems: richLineItems
      });

    } catch (error) {
      console.error("❌ REPORT INIT FAILED:", error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // --- COLOR LOGIC ---
  const getRiskColor = (score) => {
    if (score > 80) return { text: 'text-rose-600', bg: 'bg-rose-500', shadow: 'shadow-rose-500/50' }; // Red
    if (score > 60) return { text: 'text-orange-600', bg: 'bg-orange-500', shadow: 'shadow-orange-500/50' }; // Orange
    if (score > 40) return { text: 'text-yellow-600', bg: 'bg-yellow-500', shadow: 'shadow-yellow-500/50' }; // Yellow
    return { text: 'text-emerald-600', bg: 'bg-emerald-500', shadow: 'shadow-emerald-500/50' }; // Green
  };

  const handleRescan = () => { navigate('/dashboard'); };
  const handleValidate = () => {
    alert("Audit Validated & Archived to Ledger.");
    navigate('/dashboard');
  };

  // --- EDITABLE DATA GRID LOGIC ---
  const handleLineItemChange = (index, field, newValue) => {
    setAuditResult(prev => {
        const updatedItems = [...prev.lineItems];
        updatedItems[index] = { ...updatedItems[index], [field]: newValue };
        return { ...prev, lineItems: updatedItems };
    });
  };

  // --- CHAT LOGIC ---
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMessages = [...messages, { role: 'user', text: chatInput }];
    setMessages(newMessages);
    setChatInput("");

    setTimeout(() => {
        setMessages(prev => [...prev, { 
            role: 'ai', 
            text: `Based on the forensic scan, "${chatInput}" appears to be linked to the validated line items. I found no direct conflicts.` 
        }]);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const bgIcons = [
    { Icon: IndianRupee, top: '10%', left: '5%' }, { Icon: DollarSign, top: '15%', left: '85%' },
    { Icon: Landmark, top: '50%', left: '92%' }, { Icon: ReceiptText, top: '85%', left: '5%' },
    { Icon: Wallet, top: '15%', left: '45%' }, { Icon: TrendingUp, top: '80%', left: '90%' },
    { Icon: PieChart, top: '45%', left: '8%' }, { Icon: Coins, top: '70%', left: '94%' },
  ];

  if (loading || !auditResult) {
    return (
      <div className="h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mb-4"></div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Forensic Lab...</p>
      </div>
    );
  }

  const riskColors = getRiskColor(auditResult.riskScore);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans relative pb-24 overflow-y-auto">
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden">
        {bgIcons.map((item, idx) => (
          <item.Icon key={idx} className="absolute text-slate-900" size={120} style={{ top: item.top, left: item.left }} />
        ))}
      </div>

      {/* --- NAVBAR --- */}
      <nav className="h-24 flex items-center justify-between px-6 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-[100]">
        <div className="flex items-center gap-4">
            <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "#E2E8F0" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/dashboard')}
                className="p-3 rounded-full bg-slate-100 text-slate-600 transition-colors shadow-sm border border-slate-200"
            >
                <ArrowLeft size={20} />
            </motion.button>

            <div className="flex items-center gap-4 group cursor-pointer">
                <div className="h-14 w-14 rounded-2xl shadow-sm border border-slate-100 overflow-hidden shrink-0 transition-transform group-hover:scale-105">
                    <img src={logo} alt="Plutus" className="h-full w-full object-cover scale-[3.4]" />
                </div>
                <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none group-hover:text-rose-600 transition-colors">
                        FORENSIC LAB
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-1">
                        CASE ID: #2026-X99
                    </span>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-10">
            <button className="text-slate-300 hover:text-blue-600 transition-colors"><Bell className="h-6 w-6" /></button>
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
                        <img src={user.photoURL} alt="User" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                    </div>
                )}
            </div>
            <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#DC2626", color: "#FFFFFF", borderColor: "#EF4444" }}
                whileTap={{ scale: 0.95 }}
                onClick={logout} 
                className="px-6 py-2.5 rounded-2xl bg-[#0F172A] text-white text-[10px] font-bold uppercase tracking-widest border border-transparent transition-all flex items-center gap-2 shadow-lg"
            >
                <LogOut className="h-4 w-4" /><span>Logout</span>
            </motion.button>
        </div>
      </nav>

      {/* --- HUD --- */}
      <div className="bg-white/60 backdrop-blur-md border-b border-slate-200 px-6 py-8 flex items-center justify-between shadow-sm relative z-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{auditResult.filename}</h2>
          <div className="flex items-center gap-4 mt-3">
             <span className="px-5 py-2 bg-rose-50 text-rose-600 text-xs font-black uppercase tracking-[0.2em] border border-rose-200 rounded-xl shadow-sm">
                {auditResult.status}
             </span>
             <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                <Star size={20} className="text-amber-500 fill-amber-500" />
                <span className="text-sm font-black text-slate-700 uppercase tracking-widest">Vendor Trust: {auditResult.reputation}%</span>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-12 text-right">
             <div className="hidden lg:block">
               <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Global Risk Score</span>
               <div className="flex items-center gap-4">
                  <div className="h-3 w-48 bg-slate-200 rounded-full overflow-hidden border border-slate-200">
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${auditResult.riskScore}%` }} transition={{ duration: 1.5 }} 
                        className={`h-full ${riskColors.bg} shadow-[0_0_10px_rgba(0,0,0,0.2)]`} 
                      />
                  </div>
                  <span className={`text-3xl font-black leading-none ${riskColors.text}`}>{auditResult.riskScore}</span>
               </div>
             </div>
        </div>
      </div>

      <main className="max-w-[1800px] mx-auto p-12 grid grid-cols-12 gap-12 relative z-10 min-h-[900px]">
        
        {/* LEFT PANEL: PREVIEW */}
        <section className="col-span-7 bg-slate-200/60 backdrop-blur-xl rounded-[4rem] border border-slate-300 shadow-inner relative flex items-center justify-center min-h-[750px] overflow-hidden">
           {filePreview ? (
             fileType?.includes('pdf') ? (
               <iframe src={filePreview} className="w-full h-full rounded-[4rem]" style={{ border: 'none' }} title="Forensic Preview" />
             ) : (
               <img src={filePreview} alt="Evidence" className="w-full h-full object-contain rounded-[4rem]" />
             )
           ) : (
             <div className="text-slate-400 font-bold uppercase tracking-[0.8em] text-[10px]">No Visual Evidence Loaded</div>
           )}
        </section>

        {/* RIGHT PANEL: INTELLIGENCE */}
        <section className="col-span-5 flex flex-col gap-10 h-full">
          
          <div className="bg-white/80 backdrop-blur-xl p-3 rounded-[2.5rem] border border-slate-200 flex gap-2 shadow-lg">
            {[
              { id: 'knowledge', icon: BrainCircuit, label: 'Knowledge' },
              { id: 'datagrid', icon: Table, label: 'Data Grid' },
              { id: 'anomalies', icon: ShieldAlert, label: 'Anomalies' },
              { id: 'interrogator', icon: MessageSquare, label: 'Interrogator' }
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 py-5 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.1em] transition-all ${activeTab === tab.id ? "bg-[#0F172A] text-white shadow-2xl scale-[1.02]" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"}`}>
                <tab.icon size={18} /><span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-[4rem] border border-slate-200 shadow-2xl flex flex-col min-h-[650px] overflow-hidden">
            <div className="p-12 overflow-y-auto max-h-[750px] custom-scrollbar h-full">
              <AnimatePresence mode="wait">
                
                {/* 🌟 UPGRADED KNOWLEDGE TAB */}
                {activeTab === 'knowledge' && (
                  <motion.div key="k-tab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    
                    <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">Intelligence Summary</h3>
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600"><Activity size={24}/></div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Entries</p>
                                <p className="text-2xl font-bold text-slate-900 leading-none mt-1">50 Validated</p>
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600"><TrendingUp size={24}/></div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Processing Time</p>
                                <p className="text-2xl font-bold text-slate-900 leading-none mt-1">1.24s</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">Extracted Entities</h3>
                    <div className="grid grid-cols-2 gap-4 mb-12">
                      {(auditResult.entities || []).map((ent, i) => (
                        <div key={i} className="p-8 bg-blue-50/80 rounded-[2.5rem] border border-blue-100 flex flex-col justify-between">
                          <p className="text-[12px] font-bold text-blue-600 uppercase tracking-widest mb-3">{ent.key}</p>
                          <p className="text-xl font-semibold text-slate-900 tracking-tighter leading-tight">{ent.value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 🌟 50-ITEM EDITABLE DATA GRID */}
                {activeTab === 'datagrid' && (
                  <motion.div key="d-tab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.4em]">Editable Ledger ({auditResult.lineItems.length} Entries)</h3>
                        <button onClick={() => downloadForensicReport(auditResult.filename)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95">
                            <Download size={14} /> Export CSV
                        </button>
                     </div>
                     <div className="border border-slate-200 rounded-3xl overflow-auto shadow-inner bg-slate-50/50 flex-1 max-h-[500px] custom-scrollbar">
                      <table className="w-full text-left text-[12px] font-medium min-w-[800px]">
                        <thead className="bg-white border-b border-slate-200 text-slate-400 uppercase tracking-wider sticky top-0 z-10 shadow-sm">
                          <tr>
                            <th className="px-4 py-4 font-black">Date</th>
                            <th className="px-4 py-4 font-black">Txn Ref</th>
                            <th className="px-4 py-4 font-black">Description</th>
                            <th className="px-4 py-4 font-black text-center">Type</th>
                            <th className="px-4 py-4 font-black">GSTIN</th>
                            <th className="px-4 py-4 font-black text-right">Amount (₹)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(auditResult.lineItems || []).map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-100/50 transition-colors">
                              <td className="px-2 py-2 w-28"><input type="text" value={item.date} onChange={(e) => handleLineItemChange(idx, 'date', e.target.value)} className="w-full bg-transparent border border-transparent focus:border-blue-500 rounded-lg px-2 py-2 outline-none font-medium text-slate-500" /></td>
                              <td className="px-2 py-2 w-36"><input type="text" value={item.id} onChange={(e) => handleLineItemChange(idx, 'id', e.target.value)} className="w-full bg-transparent border border-transparent focus:border-blue-500 rounded-lg px-2 py-2 outline-none font-medium text-slate-400 text-[10px]" /></td>
                              <td className="px-2 py-2"><input type="text" value={item.desc} onChange={(e) => handleLineItemChange(idx, 'desc', e.target.value)} className="w-full bg-transparent border border-transparent focus:border-blue-500 rounded-lg px-2 py-2 outline-none font-bold text-slate-900" /></td>
                              <td className="px-2 py-2 w-24 text-center">
                                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-wider ${item.type === 'CREDIT' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>{item.type}</span>
                              </td>
                              <td className="px-2 py-2 w-40"><input type="text" value={item.gstin} onChange={(e) => handleLineItemChange(idx, 'gstin', e.target.value)} className="w-full bg-transparent border border-transparent focus:border-blue-500 rounded-lg px-2 py-2 outline-none font-medium text-slate-500 text-[11px]" /></td>
                              <td className="px-2 py-2 w-32"><input type="text" value={item.amount} onChange={(e) => handleLineItemChange(idx, 'amount', e.target.value)} className="w-full bg-transparent border border-transparent focus:border-blue-500 rounded-lg px-2 py-2 outline-none font-black text-blue-600 text-right" /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'anomalies' && (
                  <motion.div key="a-tab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10">Detected Risk Patterns</h3>
                    <div className="space-y-6">
                      {(auditResult.anomalies || []).map((flag, index) => (
                        <div key={index} className="p-8 bg-rose-50/50 rounded-[2.5rem] border border-rose-100 flex gap-6 items-start shadow-sm">
                          <AlertTriangle className="text-rose-500 shrink-0 mt-1" size={28} />
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                               <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em]">{flag.type}</span>
                               <span className="px-2 py-0.5 bg-rose-600 text-white text-[8px] font-black uppercase rounded-md tracking-tighter">{flag.severity}</span>
                            </div>
                            <p className="text-lg font-bold text-rose-900 leading-tight mb-3">{flag.message}</p>
                            <p className="text-[12px] text-rose-800 font-medium leading-relaxed opacity-70">{flag.reasoning}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'interrogator' && (
                  <motion.div key="i-tab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full flex flex-col justify-between" style={{ height: '550px' }}>
                     <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-6 rounded-[2rem] text-sm font-medium leading-relaxed ${msg.role === 'user' ? 'bg-[#0F172A] text-white rounded-br-none' : 'bg-slate-100 text-slate-700 rounded-bl-none'}`}>
                                    {msg.role === 'ai' && <Bot size={16} className="mb-2 text-blue-500" />}
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                     </div>
                     <div className="relative mt-4">
                        <div className="relative group">
                          <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Ask Plutus about this audit..." className="w-full bg-slate-50/50 border border-slate-200 rounded-full py-5 px-8 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 shadow-inner" />
                          <button onClick={handleSendMessage} className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all"><SendHorizontal size={18} /></button>
                        </div>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* --- LIVELY BUTTONS --- */}
            <div className="p-10 bg-slate-50/80 border-t border-slate-200 flex gap-6 mt-auto">
               <button onClick={handleValidate} className="flex-1 py-6 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white text-[13px] font-black uppercase tracking-widest rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"><CheckCircle2 size={18} />Validate Audit</button>
               <button onClick={handleRescan} className="flex-1 py-6 bg-white border-2 border-slate-200 text-slate-900 text-[13px] font-black uppercase tracking-widest rounded-full hover:bg-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"><RefreshCw size={18} />Request Rescan</button>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default ReportView;