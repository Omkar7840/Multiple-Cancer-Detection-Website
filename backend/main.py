from flask import Flask, request, jsonify
from flask_cors import CORS
import onnxruntime as ort
import numpy as np
from PIL import Image
import os

app = Flask(__name__)
CORS(app)

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")

MODEL_MAP = {
    "brain": "braintumormodel.onnx",
    "kidney": "kidney_model.onnx"
}

SESSIONS = {}


def load_model(cancer_type):
  
    if cancer_type not in MODEL_MAP:
        return None
    model_path = os.path.join(MODEL_DIR, MODEL_MAP[cancer_type])
    if not os.path.exists(model_path):
        return None
    if cancer_type not in SESSIONS:
        session = ort.InferenceSession(model_path)
        print(f" Loaded {cancer_type} model: {model_path}")
        print(" Model Inputs:", session.get_inputs())
        print(" Model Outputs:", session.get_outputs())
        SESSIONS[cancer_type] = session
    return SESSIONS[cancer_type]


def preprocess_image(file, input_shape):
  
    img = Image.open(file).convert("RGB")

    if len(input_shape) == 4:
        if input_shape[1] == 3:  
            h, w = input_shape[2], input_shape[3]
        else:  
            h, w = input_shape[1], input_shape[2]
    else:
        h, w = 224, 224  

    img = img.resize((w, h))
    arr = np.array(img).astype(np.float32) / 255.0

    if len(input_shape) == 4 and input_shape[1] == 3:  
        arr = np.transpose(arr, (2, 0, 1))  
        arr = np.expand_dims(arr, axis=0)
    elif len(input_shape) == 4 and input_shape[-1] == 3:  
        arr = np.expand_dims(arr, axis=0)
    else:
        raise ValueError(f"Unsupported input shape: {input_shape}")

    return arr


@app.route("/analyze/<cancer_type>", methods=["POST"])
def analyze(cancer_type):
    if cancer_type not in MODEL_MAP:
        return jsonify({"error": f"Model for '{cancer_type}' not available"}), 400

    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    model = load_model(cancer_type)
    if model is None:
        return jsonify({"error": f"Model file for {cancer_type} not found"}), 404

    try:
       
        input_meta = model.get_inputs()[0]
        input_shape = input_meta.shape
        input_name = input_meta.name
        output_name = model.get_outputs()[0].name

       
        img_array = preprocess_image(file, input_shape)

        
        preds = model.run([output_name], {input_name: img_array})[0]

        
        if preds.ndim == 2:  
            if preds.shape[1] == 2:
                prob_cancer = float(preds[0][1])
            else:
                prob_cancer = float(preds[0][0])
        else:
            prob_cancer = float(preds[0])

        detected = prob_cancer > 0.5

        return jsonify({
            "cancerDetected": detected,
            "confidence": prob_cancer
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

