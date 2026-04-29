import sys
import json
import numpy as np
import warnings
warnings.filterwarnings('ignore')

from PIL import Image
import tensorflow as tf

image_path  = sys.argv[1]
model_path  = sys.argv[2]
labels_path = sys.argv[3]

model  = tf.keras.models.load_model(model_path)
labels = json.load(open(labels_path))

img  = Image.open(image_path).convert('RGB').resize((224, 224))
arr  = np.expand_dims(np.array(img) / 255.0, axis=0)
pred = model.predict(arr, verbose=0)[0]
idx  = int(np.argmax(pred))

print(json.dumps({"label": labels[idx], "confidence": int(pred[idx] * 100)}))
