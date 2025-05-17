import requests

DATABASE_URL = "https://hackaton-b34ea-default-rtdb.europe-west1.firebasedatabase.app/"

def get_group_photos(id_token, user_id):
    group_id = get_first_group_id(id_token, user_id)  # get first group_id
    url = f"{DATABASE_URL}groups/{group_id}/photos.json?auth={id_token}"
    response = requests.get(url)

    if response.status_code != 200:
        raise Exception("Failed to retrieve group photos:", response.json())

    return response.json()  # Returns {photo_id: photo_data}


def get_first_group_id(id_token, user_id):
    url = f"{DATABASE_URL}users/{user_id}/groups.json?auth={id_token}"
    response = requests.get(url)

    if response.status_code != 200:
        raise Exception("Failed to fetch user groups:", response.json())

    groups = response.json()
    if not groups:
        raise Exception("User does not belong to any groups")

    # Return the first group_id key
    first_group_id = next(iter(groups.keys()))
    return first_group_id