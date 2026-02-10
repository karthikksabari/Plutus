import os
from dotenv import load_dotenv

load_dotenv()

print("--- 🔍 CONFIGURATION DIAGNOSTIC ---")

# 1. Check Google API Key
google_key = os.getenv("GOOGLE_API_KEY")
if not google_key:
    print("❌ GOOGLE_API_KEY is MISSING in .env file!")
elif not google_key.startswith("AIza"):
    print("⚠️ GOOGLE_API_KEY looks invalid (Should start with 'AIza'). Check for spaces.")
else:
    print("✅ Google API Key found.")

# 2. Check Supabase
supa_url = os.getenv("SUPABASE_URL")
supa_key = os.getenv("SUPABASE_KEY")

if not supa_url or "supabase.co" not in supa_url:
    print("❌ SUPABASE_URL is missing or invalid.")
else:
    print("✅ Supabase URL found.")

if not supa_key:
    print("❌ SUPABASE_KEY is missing.")
else:
    print("✅ Supabase Key found.")

# 3. Check Backboard (If used)
bb_key = os.getenv("BACKBOARD_API_KEY")
if not bb_key:
    print("⚠️ BACKBOARD_API_KEY is missing (Memory won't work).")
else:
    print("✅ Backboard Key found.")

print("-----------------------------------")