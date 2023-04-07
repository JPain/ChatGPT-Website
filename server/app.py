import os
from flask import Flask, jsonify, request
import openai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/api/models", methods=["GET"])
def list_models():
    try:
        models = openai.Model.list()
        model_names = [model.id for model in models['data']]
        return jsonify({"models": model_names})
    except Exception as e:
        print(e)
        return jsonify({"message": "Something went wrong."}), 500

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    text = data.get("text")
    engine = data.get("engine", "davinci")
    history = data.get("history", [])
    prompt = f"The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\n{history}\n\nHuman: {text}\nAI:"

    try:
        response = openai.Completion.create(
            engine=engine,
            prompt=prompt,
            max_tokens=150,
            n=1,
            stop="\n",
            temperature=0.9,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0.6,
        )
        message = response.choices[0].text.strip()
        return jsonify({"message": message})
    except Exception as e:
        print(e)
        return jsonify({"message": "Something went wrong."}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
