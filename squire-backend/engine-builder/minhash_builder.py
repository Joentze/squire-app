"""MinHash Forest Builder"""
import time
import pandas as pd
from datasketch import MinHash, MinHashLSHForest
from preprocess import preprocess_text


def build_forest(data, perms: int):
    """Build Forest"""
    start_time = time.time()
    minhash = []

    for text in data['text']:
        tokens = preprocess_text(text)
        minhash_object = MinHash(num_perm=perms)
        for token in tokens:
            minhash_object.update(token.encode('utf8'))
        minhash.append(minhash_object)

    forest = MinHashLSHForest(num_perm=perms)

    for i, m in enumerate(minhash):
        forest.add(i, m)

    forest.index()

    print(f'It took {(time.time()-start_time)} seconds to build forest.')

    return forest


def preprocess_dataframe(data):
    """preprocess data frame"""
    data["text"] = data["Title"] + " " + data["SEO Description"]
    data = data[data["text"].notna()]
    data = data.drop_duplicates()
    return data


if __name__ == "__main__":
    data = preprocess_dataframe("")
    forest = build_forest(data, 128)
