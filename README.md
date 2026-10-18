# Plutus

Self-learning financial document intelligence and audit automation engine.

## The problem

Financial institutions and audit teams process huge volumes of unstructured documents — multi-page bank statements, tax invoices, handwritten receipts, voice notes. Rule-based OCR breaks down here because document layouts constantly change, and manual verification doesn't scale.

Plutus takes a different approach: layout-aware AI extraction, backed by strict algebraic validation. It ingests documents in any format, reconstructs tabular data, cross-checks the numbers against each other, and surfaces anomalies through an auditor dashboard — instead of trusting the extraction blindly.

## How it works

1. **Ingestion** — accepts PDFs, images (PNG/JPEG/TIFF), and optional audio clips.
2. **Classification** — identifies document type (bank statement, payslip, tax invoice) and locates tables, headers, and handwritten notes.
3. **Extraction** — converts unstructured visual content into structured JSON and clean tabular data.
4. **Validation** — the core fintech logic: checks balance continuity (`closing balance = opening balance + deposits − withdrawals`), validates date sequencing, flags implausible figures, and catches arithmetic inconsistencies.
5. **Human-in-the-loop review** — flags low-confidence or suspicious fields for a human auditor; corrections feed back into the system.

## Features

- Ingests PDFs, images, and scans without needing a pre-built template per document type
- Classifies incoming documents automatically before extraction
- Transcribes handwritten notes and marginal annotations
- Validates arithmetic (`subtotal + tax = total`) and sequence logic (invoice date ≤ current date)
- Resolves vendor-name variants to a single entity (e.g. "Amazon" and "Amzn Mktp")
- Confidence indicator per extracted field, so low-confidence extractions are visible rather than silently trusted
- Converts spoken financial updates into structured transactions
- Exports clean audit reports to Excel/CSV

## Stack

- **Frontend** — React + Vite
- **Backend** — FastAPI (Python)
- **Extraction** — multimodal vision-language model for layout and table reconstruction
- **Storage** — PostgreSQL / Supabase for audit logs and correction history

## Screenshots
**Login page**
<img width="1707" height="986" alt="image" src="https://github.com/user-attachments/assets/537c5255-51a7-47b0-abe4-9f55e69ca67c" />

**Upload and dropzone**
Drag-and-drop zone for uploading one or more financial documents, with an option to record a voice update that gets transcribed into a structured transaction.

<img width="1710" height="1107" alt="image" src="https://github.com/user-attachments/assets/193fd4c9-a33c-402c-8473-fa4357928006" />

**Extracted data grid**
The structured view after extraction: clean line items, deposits, and withdrawals, each with a per-field confidence indicator so low-confidence extractions are visible instead of silently trusted.

<img width="1710" height="1107" alt="image" src="https://github.com/user-attachments/assets/201be0fa-c601-454f-b49d-b2dcec1b9437" />


**Anomaly and fraud flagging**
Transactions that fail a validation check — a broken balance, a suspicious date, a duplicate — get flagged automatically for the auditor to review.

<img width="1710" height="247" alt="image" src="https://github.com/user-attachments/assets/8aab51e1-b6b1-4990-82e1-bae09c97bb17" />

## Running it locally

\`\`\`bash
git clone https://github.com/karthikksabari/Plutus.git
cd Plutus

# backend
cd backend
pip install fastapi uvicorn pymupdf pandas openpyxl
uvicorn main:app --reload --port 8000

# frontend (separate terminal)
cd ../frontend
npm install
npm run dev
\`\`\`
