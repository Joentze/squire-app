"""main file"""

import os
from typing import List
import openai
from embeddings.get_embeddings import get_embeddings
from supabase import create_client
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

SIMILARITY_THRESHOLD = 0.001

openai.api_key = OPENAI_API_KEY

supabase_client = create_client(
    supabase_url=SUPABASE_URL, supabase_key=SUPABASE_PWD)

def get_best_matches(query: str,
                     number_of_matches: int,
                     build_id: str,
                     project_id: str) -> List[object]:
    """returns best matches with metadatas"""
    query_embedding = get_embeddings(query)
    matches = supabase_client.rpc("match_documents", {
        "query_embedding": query_embedding,
        "similarity_threshold": SIMILARITY_THRESHOLD,
        "match_count": number_of_matches,
        "build_id": build_id,
        "project_id": project_id
    }).execute()
    return matches

from flask import Flask, request
app = Flask(__name__)

@app.route('/api', methods=['GET'])

def get_data():
    query = request.args.get('query')
    number_of_matches = request.args.get('number_of_matches')
    project_id = request.args.get('project_id')
    build_id = request.args.get('build_id')
    
    response = get_best_matches(query, number_of_matches, build_id, project_id)
    return response.data
    
if __name__ == "__main__":
    app.run(port=8000, debug=True)
    # response = get_best_matches("hello world", 1, "id_1", "id_2")
    # print(response)