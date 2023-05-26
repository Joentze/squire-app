"""main file"""
import os

# ================================================
# ====================FOR KEYS====================
try:
    from access_keys import SUPABASE_PWD, SUPABASE_URL, OPENAI_API_KEY
except ImportError:
    SUPABASE_URL = os.environ["SUPABASE_URL"]
    SUPABASE_PWD = os.environ["SUPABASE_PWD"]
    OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
    print("Error: Put file 'access_keys.py' in ./squire-backend")

# ====================FOR KEYS====================
# ================================================
