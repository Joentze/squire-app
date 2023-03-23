"""Module to create recommedation engine object"""
import numpy as np
import pandas as pd
from datasketch import MinHash
from minhash_builder import build_forest, preprocess_dataframe
from preprocess import preprocess_text


class RecommendationEngine:
    """Recommendation Engine Object"""

    def __init__(self, two_d_array) -> None:
        self.permutations = 128
        self.two_d_array = two_d_array
        self.dataframe = pd.DataFrame(
            self.two_d_array[1:], columns=self.two_d_array[0])
        self.minhash_reco_engine = build_forest(
            preprocess_dataframe(self.dataframe), self.permutations)

    def query_minhash(self, query_title: str, num_of_recos: int):
        """function to query minhash"""
        tokens = preprocess_text(query_title)
        min_hash = MinHash(num_perm=self.permutations)
        for token in tokens:
            min_hash.update(token.encode('utf8'))
        idx_array = np.array(
            self.minhash_reco_engine.query(min_hash, num_of_recos))
        if len(idx_array) == 0:
            return None
        result = self.dataframe.iloc[idx_array]['Title']
        return result
