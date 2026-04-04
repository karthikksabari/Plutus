import React, { useState, useEffect, useRef } from 'react';
import { Upload, CheckCircle, ShieldAlert, FileSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, uploading, success, rejected, error
  const [errorMessage, setErrorMessage] = useState("");
  const [logIndex, setLogIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const logs = [
    "Initializing Secure Ingress...",
    "Magic Bytes Verified: Analyzing structure...",
    "AI Extraction Initiated...",
    "Running Compliance Checksum...",
    "Redacting PII in Secure Memory...",
    "Verifying Financial Context..."
  ];

  // Cycles through the terminal logs
  useEffect(() => {
    let interval;
    if (status === 'uploading' && logIndex < logs.length) {
      interval = setInterval(() => setLogIndex(prev => prev + 1), 800);
    }
    return () => clearInterval(interval);
  }, [status, logIndex]);

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const processFile = async (fileObj) => {
    if (!fileObj || !(fileObj instanceof File)) return;

    setStatus('uploading');
    setLogIndex(0);
    setErrorMessage("");
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(fileObj);
      reader.onload = async () => {
          // 1. Save the visual snapshot
          localStorage.setItem('audit_file_preview', reader.result);
          localStorage.setItem('audit_file_type', fileObj.type);

          // 2. THE 5.5 SECOND DUMMY BYPASS 
          await new Promise(resolve => setTimeout(resolve, 5500));

          // 3. GENERATE DUMMY MATH/FINANCIAL PAYLOAD
          const dummyPayload = {
            status: "success",
            data: {
              meta: { 
                filename: fileObj.name, 
                document_type: "Bank Statement", 
                status: "REQUIRES_ACTION" 
              },
              scores: { 
                risk_score: 88, 
                reputation_score: 12,
                confidence: 94.5 
              },
              entities: [
                { key: "Vendor", value: "TechShell Solutions" },
                { key: "GSTIN", value: "29ABCDE1234F1Z5" },
                { key: "Total Amount", value: "₹1,45,000.00" }
              ],
              lineItems: [
                { date: "2024-04-06", desc: "Consulting Charges - April", amount: "1,20,000.00" },
                { date: "2024-04-08", desc: "Netflix Premium Subscription", amount: "849.00", status: "CONFLICT" },
                { date: "2024-04-10", desc: "Personal Gym Equipment", amount: "24,151.00", status: "CONFLICT" }
              ],
              anomalies: [
                { 
                  type: "Policy Violation", 
                  message: "Non-business expenses detected.", 
                  severity: "High",
                  reasoning: "Netflix and Gym Equipment are flagged as personal expenses under corporate policy."
                }
              ]
            }
          };

          // 4. Save Dummy Data & Advance
          localStorage.setItem('last_audit', JSON.stringify(dummyPayload));
          
          setStatus('success');
          // Wait 1 second on the green checkmark, then instantly navigate
          setTimeout(() => navigate('/report'), 1000); 
      };

    } catch (error) {
      console.error("Ingestion Error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const glitchVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { 
      opacity: [0, 1, 0.8, 1],
      x: [ -10, 0, 5, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode='wait'>
        
        {/* --- IDLE STATE --- */}
        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag}
            onDrop={(e) => { 
              e.preventDefault(); setDragActive(false); 
              if (e.dataTransfer.files && e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]); 
            }}
            onClick={() => inputRef.current.click()}
            whileHover={{ y: -5, boxShadow: "0 40px 80px -20px rgba(15, 23, 42, 0.4)" }}
            className={`group relative rounded-[4rem] min-h-[420px] flex flex-col items-center justify-center transition-all duration-500 cursor-pointer border-4 ${
              dragActive ? "bg-[#1E293B] border-blue-500 shadow-2xl" : "bg-[#0F172A] border-transparent"
            }`}
          >
            <input ref={inputRef} type="file" className="hidden" onChange={(e) => { if(e.target.files && e.target.files[0]) processFile(e.target.files[0]); }} />
            <div className="h-36 w-36 rounded-[3rem] bg-white/5 flex items-center justify-center mb-10 border border-white/10 shadow-2xl backdrop-blur-md">
              <Upload className="h-16 w-16 text-white group-hover:text-blue-400 transition-colors" />
            </div>
            <h3 className="text-5xl font-bold text-white mb-4 tracking-tighter uppercase">Drop Artifact</h3>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em]">Universal Financial Ingress</p>
          </motion.div>
        )}

        {/* --- HIGH-TECH SCANNING STATE --- */}
        {status === 'uploading' && (
          <motion.div 
            key="uploading" 
            variants={glitchVariants} initial="initial" animate="animate"
            className="rounded-[4rem] p-12 flex flex-col items-center text-center min-h-[420px] justify-center bg-[#0F172A] border-4 border-blue-500/30"
          >
            
            {/* Holographic Laser Scanner Animation */}
            <div className="relative h-40 w-40 bg-[#1E293B] rounded-[3.5rem] border border-blue-500/40 overflow-hidden mb-12 flex items-center justify-center shadow-[0_0_80px_rgba(59,130,246,0.2)]">
              {/* Scan Grid */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)", backgroundSize: "15px 15px" }} />
              
              <FileSearch className="text-blue-500/50 h-16 w-16" />
              
              {/* FIXED: Fast, continuous, full-box laser sweep (0 to 155px) */}
              <motion.div
                animate={{ y: [0, 155, 0] }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }} 
                className="absolute top-0 left-0 w-full h-[5px] bg-blue-400 shadow-[0_0_30px_rgba(96,165,250,1),0_0_10px_rgba(96,165,250,1)]"
              />
            </div>

            {/* FIXED: Terminal Icon Removed & Text Centered */}
            <div className="h-24 max-w-xl mx-auto flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.h3 
                    key={logIndex} 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-bold text-white uppercase tracking-widest leading-relaxed text-center"
                  >
                    {logs[logIndex] || "Finalizing Forensic Scan..."}
                  </motion.h3>
                </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* --- SUCCESS STATE --- */}
        {status === 'success' && (
          <motion.div key="success" className="rounded-[4rem] p-12 flex flex-col items-center text-center min-h-[420px] justify-center bg-[#0F172A] border-4 border-emerald-500/30">
            <CheckCircle className="h-24 w-24 text-emerald-400 mb-8" />
            <h3 className="text-4xl font-black text-white uppercase tracking-tight">Payload Verified</h3>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default FileUpload;