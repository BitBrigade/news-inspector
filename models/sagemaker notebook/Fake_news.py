#!/usr/bin/env python
# coding: utf-8

# # get dataset from kaggle

# In[ ]:


get_ipython().system('pip install flask pyngrok -q')


# In[1]:


import pyngrok
from pyngrok import ngrok


# In[5]:


from flask import Flask, request, jsonify
import pickle
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

app = Flask(__name__)

# Load the trained model and vectorizer
with open('fake_news_detection_model.pkl', 'rb') as file:
    classifier = pickle.load(file)

with open('tfidf_vectorizer.pkl', 'rb') as file:
    tfidf_vectorizer = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    # Get the text data from the request
    text_data = request.json['text']

    # Preprocess the text data using the loaded TF-IDF vectorizer
    text_features = tfidf_vectorizer.transform(pd.Series(text_data))

    # Make predictions using the loaded classifier
    prediction = int(classifier.predict(text_features)[0])

    return jsonify({'prediction': prediction})


# In[6]:


from pyngrok import ngrok
ngrok.set_auth_token("2cSje11lPZyvj7YzFoSvXI5aaPg_7d6EBq1L9MDKk8H3gr9ta")


# In[7]:


# Start the ngrok tunnel
port = 8000
tunnel = ngrok.connect(port)
print(f"Public URL: {tunnel.public_url}")


# In[ ]:


# Run the Flask application
if __name__ == "__main__":
  app.run(host="0.0.0.0", port=port)


# In[ ]:




