import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

print("\n--- PLUTUS ENGINE LOCK-IN ---")

# THIS IS THE ONE THAT WORKED IN YOUR SCREENSHOT.
# DO NOT CHANGE THIS LINE.
MODEL_ID = "models/gemini-2.5-flash"

try:
    genai.configure(api_key=GOOGLE_API_KEY)
    
    print(f"Initializing Engine: {MODEL_ID}...")
    model = genai.GenerativeModel(MODEL_ID)
    
    # We ask for a short JSON to prove it's ready for coding
    response = model.generate_content("Return this JSON: {'status': 'active'}")
    
    print(f"✅ ENGINE SECURED.")
    print(f"🤖 Response: {response.text.strip()}")
    print("\nWe are ready to code.")

except Exception as e:
    print(f"\n❌ FAILED. Error: {e}")