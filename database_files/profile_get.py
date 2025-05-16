import requests

DATABASE_URL = "https://hackaton-b34ea-default-rtdb.europe-west1.firebasedatabase.app/"

def get_user_name(id_token, user_id):
    url = f"{DATABASE_URL}users/{user_id}/name.json?auth={id_token}"
    response = requests.get(url)

    if response.status_code == 200:
        print(response.json())
        return response.json()  # Returns the name as a string
    else:
        print("Failed to get user name:", response.text)
        return None