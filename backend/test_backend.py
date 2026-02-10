import requests
import os

# 1. SETUP
url = "http://localhost:8000/analyze"
file_path = "invoice.jpg"  # <--- WE WILL CHANGE THIS

# 2. CHECK IF FILE EXISTS
if not os.path.exists(file_path):
    print(f"❌ Error: Could not find file '{file_path}'")
    print("-> Please put a dummy 'invoice.jpg' or 'test.pdf' in this folder and try again.")
    exit()

# 3. SEND TO PLUTUS
print(f"🚀 Uploading {file_path} to Plutus Engine...")

try:
    with open(file_path, "rb") as f:
        files = {"file": (file_path, f, "image/jpeg")} # Adjust type if sending PDF
        response = requests.post(url, files=files)

    # 4. PRINT RESULTS
    if response.status_code == 200:
        print("\n✅ SUCCESS! God Mode Response:")
        print(response.json())
    else:
        print(f"\n❌ FAILED (Status {response.status_code}):")
        print(response.text)

except Exception as e:
    print(f"\n❌ Connection Error: {e}")
    print("-> Is the server running?")