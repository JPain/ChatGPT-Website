import os
from flask import Flask, jsonify, request
import openai

app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/api/chat", methods=["POST"])
def chat():
    text = request.json.get("text")
    prompt = f"The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: {text}\nAI:"

    try:
        response = openai.Completion.create(
            engine="davinci",
            prompt=prompt,
            max_tokens=150,
            n=1,
            stop="\n",
        )
        message = response.choices[0].text.strip()
        return jsonify({"message": message})
    except Exception as e:
        print(e)
        return jsonify({"message": "Something went wrong."}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
