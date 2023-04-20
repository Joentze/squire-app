"""Module to build pickle file"""
from urllib.request import urlopen
import csv
import time
import pickle
from uuid import uuid4
import firebase_admin
from firebase_admin import credentials, storage
from engine_builder import RecommendationEngine

try:
    cred = credentials.Certificate(
        """/Users/tanjoen/Documents/squire-app/squire-backend/engine-builder/credentials/keys.json""")
    firebase_admin.initialize_app(
        cred, {"storageBucket": "squire-backend.appspot.com"})
except Exception as error_message:
    firebase_admin.initialize_app()


def upload_object_as_file(recommedation_object: object, filename: str) -> str:
    """upload object as file in pickled bytes"""
    # converts object to bytes
    pickle_bytes = pickle.dumps(recommedation_object)
    # creates tokens for public access
    token = uuid4()
    # creates bucket to store file
    bucket = storage.bucket()
    # creates file blob
    blob = bucket.blob(filename)
    # adds token as metadata
    blob.metadata = {"firebaseStorageDownloadTokens": token}
    # uploads bytes as string
    blob.upload_from_string(pickle_bytes)
    # makes file publicly accessible
    blob.make_public()
    # gets url
    gcs_storage_url = blob.public_url
    return gcs_storage_url


def upload_file(file_path: str) -> str:
    """Upload file to firebase storage"""
    token = uuid4()
    bucket = storage.bucket()
    blob = bucket.blob(file_path)
    blob.metadata = {"firebaseStorageDownloadTokens": token}
    blob.upload_from_filename(file_path)
    blob.make_public()
    gcs_storage_url = blob.public_url
    return gcs_storage_url


def upload_recommendation(filename: str, data):
    """uploads recommendation to file storage"""
    recommendation_engine = RecommendationEngine(
        data, [])
    upload_object_as_file(recommendation_engine, filename)


if __name__ == "__main__":
    with open("test.csv", "r", encoding="utf-8") as file:
        two_d = list(csv.reader(file))
    t1 = time.time()
    engine = RecommendationEngine(two_d, ["Title", "SEO Description"])
    # t2 = time.time()
    # results = engine.query_minhash(
    #     "Domaine J.A. Ferret Pouilly-Fuisse 2018", 5)
    # print(results)
    # t3 = time.time()
    # upload_object_as_file(engine, "recommendation_engine_23_03_2023")
    # t4 = time.time()
    # print(f"time taken to build recommendation engine: {t2-t1}")
    # print(f"time taken to query recommendation engine: {t3-t2}")
    # print(f"time taken to upload recommendation engine: {t4-t3}")
    # with urlopen("https://firebasestorage.googleapis.com/v0/b/squire-backend.appspot.com/o/recommendation_engine_23_03_2023?alt=media&token=47b11af3-fe74-4197-84f5-32e923329f4e") as pf:
    #     engine = pickle.load(pf)
    # print(engine.query_minhash("Domaine J.A. Ferret Pouilly-Fuisse 2018", 5))
