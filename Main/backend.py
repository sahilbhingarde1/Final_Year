import torch
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS  # <-- ADD THIS IMPORT!
from torchvision.utils import save_image
import io
from text_to_face_dcgan import Generator, SentenceEncoder

app = Flask(__name__)
CORS(app)  # <-- ADD THIS LINE!

# Model parameters (must match your training)
NOISE_SIZE = 100
FEATURE_SIZE = 128
NUM_CHANNELS = 3
EMBEDDING_SIZE = 768
REDUCED_DIM_SIZE = 256

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

generator = Generator(
    noise_size=NOISE_SIZE,
    feature_size=FEATURE_SIZE,
    num_channels=NUM_CHANNELS,
    embedding_size=EMBEDDING_SIZE,
    reduced_dim_size=REDUCED_DIM_SIZE
).to(device)
generator.load_state_dict(torch.load('generator_50k.pth', map_location=device))
generator.eval()

sentence_encoder = SentenceEncoder(device)

@app.route('/generate-face/', methods=['POST'])
def generate_face():
    try:
        data = request.json
        prompt = data.get('prompt')
        if not prompt:
            return jsonify({'error': 'No prompt provided'}), 400

        text_embedding = sentence_encoder.convert_text_to_embeddings([prompt])
        noise = torch.randn(1, NOISE_SIZE).to(device)
        with torch.no_grad():
            fake_img = generator(noise, text_embedding).detach().cpu()

        buf = io.BytesIO()
        save_image(fake_img, buf, format='PNG', normalize=True)
        buf.seek(0)
        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)