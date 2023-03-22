"""Module to build pickle file"""
from uuid import uuid4
import firebase_admin
from firebase_admin import credentials, storage

cred = credentials.Certificate(
    """/Users/tanjoen/Documents/squire-app/squire-backend/engine-builder/credentials/keys.json""")
firebase_admin.initialize_app(
    cred, {"storageBucket": "squire-backend.appspot.com"})


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


if __name__ == "__main__":
    url = upload_file("MinHashForest.pickle")
    print(url)
