import pandas as pd
from io import BytesIO
from typing import Dict, List

class ReportEngine:
    """
    GOD-TIER REPORTING
    ------------------
    Converts the JSON Knowledge Graph into a Professional Forensic Audit Report (Excel).
    Features:
    - Auto-flattening of line items.
    - Audit Status Flagging.
    - Separate summary and detail sheets.
    """

    @staticmethod
    def generate_excel_report(audit_data: Dict) -> BytesIO:
        """
        Generates a Multi-Sheet Excel Report in memory (no disk write).
        """
        output = BytesIO()
        
        # --- SHEET 1: EXECUTIVE SUMMARY ---
        # Extract high-level metadata
        meta = audit_data.get('meta', {})
        entities = audit_data.get('entities', {})
        financials = audit_data.get('financials', {})
        checks = audit_data.get('auditor_checks', {})
        
        summary_data = [{
            "Document Name": meta.get("filename", "Unknown"),
            "Document Type": meta.get("document_type", "N/A"),
            "Vendor": entities.get("vendor_name", "N/A"),
            "GSTIN": entities.get("gstin", "N/A"),
            "Total Amount": financials.get("total_amount", 0.0),
            "Risk Score": "HIGH" if checks.get("is_suspicious") else "LOW",
            "Flags": ", ".join(checks.get("flags", [])),
            "Processing Date": "2026-02-09" # In production, use datetime.now()
        }]
        
        df_summary = pd.DataFrame(summary_data)
        
        # --- SHEET 2: LINE ITEM DETAILS ---
        # Flatten the line items for table reconstruction
        line_items = financials.get('line_items', [])
        if not line_items:
            # Create empty schema if no items
            line_items = [{"Description": "No items extracted", "Qty": 0, "Total": 0}]
            
        df_items = pd.DataFrame(line_items)
        
        # --- WRITING TO EXCEL ---
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df_summary.to_excel(writer, index=False, sheet_name='Executive Summary')
            df_items.to_excel(writer, index=False, sheet_name='Line Items')
            
        output.seek(0)
        return output