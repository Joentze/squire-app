"""Module to build pickle file"""
import pickle
from uuid import uuid4
import firebase_admin
from firebase_admin import credentials, storage

try:
    cred = credentials.Certificate(
    """/Users/tanjoen/Documents/squire-app/squire-backend/engine-builder/credentials/keys.json""")
    firebase_admin.initialize_app(
    cred, {"storageBucket": "squire-backend.appspot.com"})
except Exception as error_message:
    firebase_admin.initialize_app()


def upload_object_as_file(obj:object, filename:str)->None:
    "upload object as file in pickled bytes"
    pickle_bytes = pickle.dumps(obj)
    token = uuid4()
    bucket = storage.bucket()
    blob = bucket.blob(filename)
    blob.metadata = {"firebaseStorageDownloadTokens": token}
    blob.upload_from_string(pickle_bytes)
    blob.make_public()
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


if __name__ == "__main__":
    obj = {"hello":"world"}
    url = upload_object_as_file(obj, "binfile")
