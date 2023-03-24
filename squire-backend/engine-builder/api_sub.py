"""API access to file builder"""
import os
import ast
import csv
import json
import base64
from threading import Thread
from flask import Flask, request
from file_builder import upload_recommendation

app = Flask(__name__)

PORT = 8080  # int(os.environ["PORT"])


def check_post_data_format(envelope):
    """check for pub message format"""
    if not envelope:
        return True
    if not isinstance(envelope, dict) or "message" not in envelope:
        return True
    return False


def message_obj(pubsub_message) -> object:
    """converts from strong to object"""
    if isinstance(pubsub_message, dict) and "data" in pubsub_message:
        string_obj = base64.b64decode(
            pubsub_message["data"]).decode("utf-8").strip()
        return ast.literal_eval(string_obj)
    return None


# @app.route("/", methods=["POST"])
# def index():
#     """Receives POST request"""
#     envelope = request.get_json()

#     if check_post_data_format(envelope):
#         return "Bad Request: Check Gcloud Pub/Sub message formating or message body type", 400

#     pubsub_message = envelope["message"]

#     data_configs = message_obj(pubsub_message)

#     if data_configs and "configs" in data_configs:
#         thread = Thread(target=scraper, kwargs={
#                         "configs": data_configs["configs"]})
#         thread.start()
#         thread.join()
#     else:
#         return ("", 400)

#     return ("", 204)


@app.route("/", methods=["POST"])
def index():
    """Receives POST request locally"""
    def build_reco(filename: str, data: list):
        upload_recommendation(filename, data)
    envelope = request.get_json()
    filename = envelope["id"]
    two_d_table = envelope["data"]
    thread = Thread(target=build_reco, kwargs={
                    "filename": filename, "data": two_d_table})
    thread.start()
    return ("", 204)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=PORT)
    # with open("test.csv", "r", encoding="utf-8") as file:
    #     two_d = str(
    #         json.dumps({"id": "test_file", "data": list(csv.reader(file))}))
    #     with open("array.txt", "w", encoding="utf-8") as write_file:
    #         write_file.write(two_d)
