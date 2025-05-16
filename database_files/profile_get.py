import requests

DATABASE_URL = 'https://your-project-id.firebaseio.com/'  # Replace with your Firebase DB URL

def get_user_name(user_id, id_token):
    url = f"{DATABASE_URL}users/{user_id}/name.json?auth={id_token}"
    response = requests.get(url)

    if response.status_code == 200:
        print(response.json())
        return response.json()  # Returns the name as a string
    else:
        print("Failed to get user name:", response.text)
        return None