import os
import time
import pandas as pd
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
REPORTS_FOLDER = 'reports'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(REPORTS_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['REPORTS_FOLDER'] = REPORTS_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        # 1. Save the Uploaded File
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        
        # 2. Simulate AI Processing
        time.sleep(1.5)

        # 3. Generate Excel Report Data (Mock Data)
        # Sheet 1: Summary
        summary_data = [{
            "Metric": "Risk Score", "Value": 85
        }, {
            "Metric": "Status", "Value": "High Risk"
        }, {
            "Metric": "Total Pages", "Value": 12
        }, {
            "Metric": "Scan Date", "Value": time.strftime("%Y-%m-%d")
        }]

        # Sheet 2: Detailed Flags
        flags_data = [
            {"Page": 1, "Issue": "Unverified Signature", "Severity": "High", "Confidence": "98%"},
            {"Page": 3, "Issue": "Large Transaction > $10k", "Severity": "Medium", "Confidence": "85%"},
            {"Page": 7, "Issue": "Duplicate Invoice ID", "Severity": "Low", "Confidence": "92%"}
        ]

        # 4. Create the Excel File using Pandas
        report_filename = f"Audit_Report_{file.filename}.xlsx"
        report_path = os.path.join(app.config['REPORTS_FOLDER'], report_filename)

        with pd.ExcelWriter(report_path, engine='openpyxl') as writer:
            pd.DataFrame(summary_data).to_excel(writer, sheet_name='Summary', index=False)
            pd.DataFrame(flags_data).to_excel(writer, sheet_name='Anomalies', index=False)

        # 5. Return JSON telling Frontend where to download
        return jsonify({
            'message': 'Analysis Complete',
            'report_url': f"http://127.0.0.1:5001/download/{report_filename}"
        }), 200

# New Route to Download the Excel File
@app.route('/download/<filename>')
def download_file(filename):
    return send_file(os.path.join(app.config['REPORTS_FOLDER'], filename), as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=5001)