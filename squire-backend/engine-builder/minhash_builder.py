"""MinHash Forest Builder"""
import time
import pandas as pd
from datasketch import MinHash, MinHashLSHForest
from preprocess import preprocess_text


def build_forest(data, perms: int):
    """Build Forest"""
    minhash = []

    for text in data['minhash_corpus']:
        tokens = preprocess_text(text)
        minhash_object = MinHash(num_perm=perms)
        for token in tokens:
            minhash_object.update(token.encode('utf8'))
        minhash.append(minhash_object)

    forest = MinHashLSHForest(num_perm=perms)

    for i, m in enumerate(minhash):
        forest.add(i, m)

    forest.index()

    return forest


def preprocess_dataframe(data, columns):
    """preprocess data frame"""
    data["minhash_corpus"] = data["Title"] + " " + data["SEO Description"]
    data = data[data["minhash_corpus"].notna()]
    data = data.drop_duplicates()
    return data


def concat_columns(data, columns: list):
    """concat labeled tax columns"""
    ret_frame_col = ""
    for cnt in range(0, len(columns)-1):
        ret_frame_col += " " + data[columns[cnt]]
    return ret_frame_col


if __name__ == "__main__":
    data = preprocess_dataframe("")
    forest = build_forest(data, 128)
