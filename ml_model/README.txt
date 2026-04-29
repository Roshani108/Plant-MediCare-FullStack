## ml_model folder

Put these files here after training your model in Google Colab:

1. leafcare_model_best.h5   ← your trained Keras model
2. labels.json              ← disease class labels
3. predict.py               ← already here, don't touch

Then run:
  pip install tensorflow pillow numpy

And restart the backend:
  npm run dev
