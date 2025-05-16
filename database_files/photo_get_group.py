import requests

DATABASE_URL = "https://hackaton-b34ea-default-rtdb.europe-west1.firebasedatabase.app/"

def get_group_photos(id_token, group_id):
    url = f"{DATABASE_URL}groups/{group_id}/photos.json?auth={id_token}"
    response = requests.get(url)

    if response.status_code != 200:
        raise Exception("Failed to retrieve group photos:", response.json())

    return response.json()  # Returns {photo_id: photo_data}
