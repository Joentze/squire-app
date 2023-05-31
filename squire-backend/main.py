"""main file"""
import os
from typing import List
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


def create_embedding(query: str) -> List[float]:
    """creates text-embedding-ada-002 embeddings from query text"""
    return


def get_best_matches(query: str, number_of_matches: int) -> List[object]:
    """returns best matches with metadatas"""
    return


if __name__ == "__main__":
    pass
