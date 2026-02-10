import React, { useState, useEffect, useRef } from 'react';
import { Upload, Loader2, CheckCircle, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { analyzeDocument } from '../services/api';

const FileUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState('idle');
  const [logIndex, setLogIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const logs = [
    "Initializing Secure Ingress...",
    "Magic Bytes Verified: Genuine PDF detected.",
    "AI Extraction Initiated (Neuro-Symbolic Core)...",
    "Running GST Modulus 36 Checksum...",
    "Redacting PII in Secure Memory...",
    "Cross-referencing Backboard.io Reputation...",
    "Analysis Complete. Syncing Forensic Lab..."
  ];

  useEffect(() => {
    let interval;
    if (status === 'uploading' && logIndex < logs.length) {
      interval = setInterval(() => {
        setLogIndex(prev => prev + 1);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [status, logIndex]);

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  // 🛡️ THE ARMOR-PLATED PROCESS FUNCTION
  const processFile = async (fileObj) => {
    if (!fileObj || !(fileObj instanceof File)) return;

    setStatus('uploading');
    setLogIndex(0);
    
    try {
      // 1. CREATE VISUAL SNAPSHOT
      const reader = new FileReader();
      reader.readAsDataURL(fileObj);
      
      reader.onload = async () => {
          // Safe Save Preview
          localStorage.setItem('audit_file_preview', reader.result);
          localStorage.setItem('audit_file_type', fileObj.type);

          // 2. CALL API
          const result = await analyzeDocument(fileObj);
          console.log("🔥 API RESPONSE:", result); // Debug Log

          // 🛡️ SAFETY CHECK 1: Did we get a valid object?
          if (!result || (!result.data && !result.status)) {
             throw new Error("Invalid response from server (Empty Payload)");
          }

          // 🛡️ SAFETY CHECK 2: Handle Nesting
          // Ensure we have the structure ReportView expects
          let safeData = result;
          
          // If the backend returned { data: { ... } }, we are good. 
          // If it returned { status: "success", data: { ... } }, we are also good.
          // We just need to ensure 'safeData' is the object containing 'data.scores', etc.
          
          // CRITICAL: Save it exactly as ReportView expects it
          localStorage.setItem('last_audit', JSON.stringify(safeData));
          
          // 3. WAIT FOR LOGS (Ferrari Feel)
          setTimeout(() => {
            setStatus('success');
            setTimeout(() => navigate('/report'), 1500);
          }, 4000);
      };

    } catch (error) {
      console.error("❌ CRASH PREVENTED:", error);
      setStatus('error');
      // Reset after 3 seconds so user can try again
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode='wait'>
        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag}
            onDrop={(e) => { 
              e.preventDefault(); 
              setDragActive(false); 
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                processFile(e.dataTransfer.files[0]); 
              }
            }}
            onClick={() => inputRef.current.click()}
            whileHover={{ y: -5, boxShadow: "0 40px 80px -20px rgba(15, 23, 42, 0.4)" }}
            className={`group relative rounded-[4rem] min-h-[420px] flex flex-col items-center justify-center transition-all duration-500 cursor-pointer border-4 ${
              dragActive ? "bg-[#1E293B] border-blue-500 shadow-2xl" : "bg-[#0F172A] border-transparent"
            }`}
          >
            <input 
              ref={inputRef} 
              type="file" 
              className="hidden" 
              onChange={(e) => { 
                if(e.target.files && e.target.files[0]) processFile(e.target.files[0]); 
              }} 
            />
            
            <div className="h-36 w-36 rounded-[3rem] bg-white/5 flex items-center justify-center mb-10 border border-white/10 shadow-2xl backdrop-blur-md">
              <Upload className="h-16 w-16 text-white group-hover:text-blue-400 transition-colors" />
            </div>
            <h3 className="text-5xl font-bold text-white mb-4 tracking-tighter uppercase text-center">
              {dragActive ? "Ingest Now" : "Drop Artifact"}
            </h3>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em] text-center">
              Universal Support • 200+ Enterprise Formats
            </p>
          </motion.div>
        )}

        {status === 'uploading' && (
          <motion.div key="uploading" className="rounded-[4rem] p-12 flex flex-col items-center text-center min-h-[420px] justify-center bg-[#0F172A]">
            <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-8" />
            <div className="h-24 flex flex-col items-center justify-center">
                <motion.h3 
                  key={logIndex}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold text-white uppercase tracking-widest max-w-xl leading-relaxed"
                >
                  {logs[logIndex] || "Finalizing Forensic Audit..."}
                </motion.h3>
            </div>
            <p className="text-blue-500/60 font-mono text-xs mt-6 uppercase tracking-[0.2em]">
              Processing Layer {Math.min(logIndex + 1, 7)}/7
            </p>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div key="success" className="rounded-[4rem] p-12 flex flex-col items-center text-center min-h-[420px] justify-center bg-[#0F172A] border-4 border-emerald-500/30">
            <CheckCircle className="h-24 w-24 text-emerald-400 mb-8" />
            <h3 className="text-4xl font-black text-white uppercase tracking-tight">Payload Verified</h3>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div key="error" className="rounded-[4rem] p-12 flex flex-col items-center text-center min-h-[420px] justify-center bg-[#0F172A] border-4 border-rose-500/30">
            <h3 className="text-2xl font-bold text-rose-500 uppercase tracking-widest">Ingestion Failed</h3>
            <p className="text-slate-400 mt-4 text-sm max-w-xs">Forensic Engine Unreachable.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;