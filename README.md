# PLUTUS - AI Forensic Auditor 🚀

Plutus is an intelligent financial auditing tool that uses **Gemini 2.5 Flash** to detect fraud, policy violations, and shell company patterns in real-time.

## 🛠️ Features
- **Smart Sampling:** Processes large PDFs/Excel files in seconds.
- **Institutional Memory:** Uses Blackboard API (Supabase) to remember past high-risk vendors.
- **Forensic Engine:** Weighted risk scoring (0-100) for transaction anomalies.
- **Manual Review:** Auditors can edit AI output before final export.

## 🚀 Quick Start

### Backend
1. `cd backend`
2. `pip install -r requirements.txt`
3. Add your `GOOGLE_API_KEY` to `.env`
4. `python main.py`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`