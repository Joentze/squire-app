"""Gets OpenAI embeddings"""
from typing import List
from openai import Embedding


EMBEDDING_MODEL = "text-embedding-ada-002"


def get_embeddings(query: str) -> List[float]:
    """gets vector embedding"""
    query = query.replace("\n", " ")
    return Embedding.create(input=[query], model=EMBEDDING_MODEL)['data'][0]['embedding']
