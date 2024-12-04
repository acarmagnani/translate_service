from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from nltk.tokenize.punkt import PunktSentenceTokenizer, PunktParameters
import re

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load translation model
model_name = "Helsinki-NLP/opus-mt-da-en"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)


# Create a fallback tokenizer if NLTK's Punkt tokenizer fails
def simple_sent_tokenize(text):
    """
    Fallback tokenizer using regex to split text into sentences
    based on punctuation and spacing.
    """
    return re.split(r"(?<=[.!?]) +", text)


# Punkt tokenizer with explicit parameter initialization
punkt_parameters = PunktParameters()
punkt_tokenizer = PunktSentenceTokenizer(punkt_parameters)


@app.route("/translate", methods=["POST"])
def translate():
    try:
        # Parse JSON request
        data = request.json
        text = data.get("text", "")
        if not text:
            return jsonify({"error": "No text provided"}), 400

        # Tokenize sentences using Punkt, fallback to regex if necessary
        try:
            sentences = punkt_tokenizer.tokenize(text)
        except Exception:
            sentences = simple_sent_tokenize(text)

        # Encode and translate sentences
        encoded = tokenizer(
            sentences, return_tensors="pt", padding=True, truncation=True
        )
        translated = model.generate(**encoded)
        translated_sentences = tokenizer.batch_decode(
            translated, skip_special_tokens=True
        )
        translated_text = " ".join(translated_sentences)

        # Return translated text
        return jsonify({"translated_text": translated_text})
    except Exception as e:
        # Return error details
        return jsonify({"error": str(e)}), 500


# Main entry point
if __name__ == "__main__":
    # Explicitly set paths to NLTK data to avoid path issues
    import nltk

    nltk.data.path.append(r"C:/Users/Dell/nltk_data")
    nltk.download("punkt", quiet=True)

    # Run Flask app
    app.run(host="0.0.0.0", port=5050)
