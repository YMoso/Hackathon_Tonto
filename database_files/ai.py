import os
import requests

# Retrieve API key from environment variable
api_key = os.getenv("5bbd5df52c2742cbba8c2c7cca0285fe")

# Define the API endpoint
url = "https://api.aimlapi.com/v1/chat/completions"

# Set up headers with the API key
headers = {
    "Authorization": f"Bearer 5bbd5df52c2742cbba8c2c7cca0285fe",
    "Content-Type": "application/json"
}

# Define the request payload

def get_response(prompt):
    data = {
    "model": "openai/o4-mini-2025-04-16",
    "messages": [
        {"role": "user", "content": prompt}
    ]
}
# Send the POST request
    response = requests.post(url, headers=headers, json=data)
    response_json = response.json()
    assistant_message = response_json['choices'][0]['message']['content']
    return assistant_message

get_response()
