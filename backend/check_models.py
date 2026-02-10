import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    print("❌ No API Key found in .env")
else:
    print(f"🔑 Testing Key: {api_key[:5]}...{api_key[-5:]}")
    genai.configure(api_key=api_key)
    
    try:
        print("\n📡 Pinging Google to list available models...")
        models = genai.list_models()
        
        found_flash = False
        print("\n✅ AVAILABLE MODELS FOR YOUR KEY:")
        for m in models:
            if 'generateContent' in m.supported_generation_methods:
                print(f"   - {m.name}")
                if "flash" in m.name.lower():
                    found_flash = True

        if not found_flash:
            print("\n⚠️ CRITICAL: No 'Flash' model found! You might need to use 'gemini-pro'.")
        else:
            print("\n✅ Flash model is available.")

    except Exception as e:
        print(f"\n❌ API CONNECTION FAILED: {e}")
        print("   -> If this says '403' or 'Quota', your KEY is dead.")
        print("   -> If this says '404', your endpoint is wrong.")