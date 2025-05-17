from datetime import date
import requests
import time

DATABASE_URL = "https://hackaton-b34ea-default-rtdb.europe-west1.firebasedatabase.app/"

def add_photo_to_group(id_token, user_id, photo_url, caption):
    today = date.today()
    group_id = get_first_group_id(id_token, user_id)  # get first group_id
    user_name = get_user_name(id_token, user_id)
    # Format it as YYYY-MM-DD
    formatted_date = today.strftime("%Y-%m-%d")

    photo_data_group = {
        "url": photo_url,
        "uploadedBy": user_name,
        "caption": caption,
        "likes": 0,
        "comments": {},
        "timestamp": formatted_date
    }
    photo_data_user = {
        formatted_date: photo_url
    }
    # Add to /groups/{groupId}/photos
    group_photo_url = f"{DATABASE_URL}groups/{group_id}/photos.json?auth={id_token}"
    group_response = requests.post(group_photo_url, json=photo_data_group)

    if group_response.status_code != 200:
        raise Exception("Failed to add photo to group:", group_response.json())

    photo_id = group_response.json()["name"]  # Firebase auto-generated ID

    # Add to /users/{userId}/groups/{groupId}/photos/{photo_id}
    user_photo_url = f"{DATABASE_URL}users/{user_id}/groups/{group_id}/photos/{photo_id}.json?auth={id_token}"
    user_response = requests.put(user_photo_url, json=photo_data_user)

    if user_response.status_code != 200:
        raise Exception("Failed to add photo to user's group folder:", user_response.json())

    print(f"✅ Photo added with ID: {photo_id}")
    return photo_id


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

def get_user_name(id_token, user_id):
    user_url = f"{DATABASE_URL}users/{user_id}/name.json?auth={id_token}"
    response = requests.get(user_url)
    if response.status_code != 200:
        raise Exception("Failed to fetch user name:", response.json())
    name = response.json()
    if not name:
        return "unknown"  # fallback if no name found
    return name