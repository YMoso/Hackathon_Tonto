import requests

DATABASE_URL = "https://hackaton-b34ea-default-rtdb.europe-west1.firebasedatabase.app/"

def get_user_photos(id_token, user_id):
    url = f"{DATABASE_URL}users/{user_id}/photos.json?auth={id_token}"
    response = requests.get(url)

    if response.status_code != 200:
        raise Exception("Failed to retrieve user photos:", response.json())

    return response.json()  # This will be a dict of {photo_id: photo_data}
