"""Preprocess title and descriptions"""
import re
from nltk.corpus import stopwords

# import ssl
# INSTALLING STOP WORDS CORPUS
# try:
#     _create_unverified_https_context = ssl._create_unverified_context
# except AttributeError:
#     pass
# else:
#     ssl._create_default_https_context = _create_unverified_https_context
# nltk.download("stopwords")

STOP_WORDS = stopwords.words()


def preprocess_text(text):
    """Preprocesses title and description"""
    text = re.sub(r'[^\w\s]', '', text)
    tokens = text.lower()
    no_stop_words = remove_stop_words(tokens.split())
    return no_stop_words


def remove_stop_words(word_list):
    """Removes stop words"""
    return [word for word in word_list if word not in STOP_WORDS]
