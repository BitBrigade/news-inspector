#!/usr/bin/env python
# coding: utf-8

# In[30]:


from flask import Flask, request, jsonify
import requests
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string
import google.generativeai as genai
from flask_cors import CORS


# In[31]:


import pyngrok
from pyngrok import ngrok


# In[32]:


app = Flask(__name__)
CORS(app)
# Download NLTK resources
nltk.download('punkt')
nltk.download('stopwords')


# In[33]:


# Set up stopwords and punctuation
stop_words = set(stopwords.words('english'))
punctuation = set(string.punctuation)

genai.configure(api_key="YOUR_API_KEY")

@app.route('/analyze', methods=['POST'])
def analyze_text():
    # Get the URL from the POST request
    url = request.json.get('url')

    # Call the Web Scraping AI API to get the text content
    api_url = 'https://api.webscraping.ai/text'
    params = {
        'api_key': 'YOUR_API_KEY',
        'url': url,
        'proxy': 'residential',
        'text_format': 'txt'
    }
    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        text_data = response.text
        text_data = text_data.replace('"', '')
        # Tokenize the text
        tokens = word_tokenize(text_data.lower())

        # Filter out stopwords and punctuation
        cleaned_tokens = [token for token in tokens if token not in stop_words and token not in punctuation]

        # Join tokens back into a string
        cleaned_text = ' '.join(cleaned_tokens)
        summary = generate_summary(cleaned_text)

        # Perform analysis using other APIs
        prediction = get_prediction(cleaned_text)
        hate = get_hate_speech(summary)

        # Return the analysis results as JSON
        return jsonify({
            'prediction': prediction,
            'summary':summary,
            'hate': hate
        })
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

def generate_summary(text):
    model = genai.GenerativeModel('gemini-pro')
    try:
        prompt = "Summarize the following text:\n" + text
        # Define the generation configuration
        generation_config = {
            "temperature":  0.9,  # Controls randomness
            "max_output_tokens":  512,  # Maximum output length
        }

        response = model.generate_content(contents=[prompt], generation_config=generation_config)

        summary = response.text

        return summary
    except requests.exceptions.RequestException as e:
        return {'error': str(e)}
    
def get_prediction(text):
    # API endpoint for text prediction
    api_url = "YOUR_API_KEY"
    try:
        # Prepare JSON data
        data = {"text": text}
        response = requests.post(api_url, json=data)
        prediction = response.json()
        return prediction
    except requests.exceptions.RequestException as e:
        return {'error': str(e)}

def get_hate_speech(text):
    # API endpoint for NSFW text classification
    api_url = "YOUR_API_KEY"
    try:
        data = {"text": text}
        response = requests.post(api_url, json=data)
        hate = response.json()
        return hate
    except requests.exceptions.RequestException as e:
        return {'error': str(e)}


# In[34]:


from pyngrok import ngrok
ngrok.set_auth_token("YOUR_API_KEY")


# In[35]:


# Start the ngrok tunnel
port = 5000
tunnel = ngrok.connect(port)
print(f"Public URL: {tunnel.public_url}")


# In[ ]:


# Run the Flask application
if __name__ == "__main__":
  app.run(host="0.0.0.0", port=port)


# In[ ]:




