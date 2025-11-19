from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from google import genai # Asumsikan Anda menggunakan pustaka Google GenAI
from dotenv import load_dotenv

load_dotenv()

# Inisialisasi aplikasi Flask
app = Flask(__name__)
# Izinkan CORS dari frontend Anda (misalnya http://localhost:3000)
CORS(app) 

# --- INI ADALAH BAGIAN UTAMA AI ---
# Ambil kunci API dari environment variables
# Pastikan Anda sudah mengatur variabel lingkungan GEMINI_API_KEY
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

@app.route('/api/chat', methods=['POST'])
def chat():
    # 1. Menerima data dari frontend
    data = request.json
    # messages = data.get('messages', [])
    # language = data.get('language', 'en')
    user_message = data.get('user_message') # Ambil pesan terbaru saja

    if not user_message:
        return jsonify({"response": "Error: Missing user message"}), 400

    try:
        # 2. Membuat prompt untuk AI
        # Anda dapat membuat prompt yang lebih kompleks
        prompt = f"Anda adalah asisten AI. Balas pesan berikut: {user_message}"

        # 3. Memanggil model AI (Google Gemini, OpenAI, dll.)
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        
        # 4. Mengirim respons kembali
        return jsonify({"response": response.text.strip()})

    except Exception as e:
        print(f"Error calling AI model: {e}")
        return jsonify({"response": "Sorry, I am having trouble connecting to the AI model."}), 500

if __name__ == '__main__':
    # Jalankan server backend pada port 5000
    app.run(port=5000)