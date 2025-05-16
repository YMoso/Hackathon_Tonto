from datetime import date
import requests
import time

DATABASE_URL = "https://hackaton-b34ea-default-rtdb.europe-west1.firebasedatabase.app/"

def add_photo_to_group(id_token, user_id, group_id, photo_url):
    today = date.today()

    # Format it as YYYY-MM-DD
    formatted_date = today.strftime("%Y-%m-%d")

    photo_data_group = {
        "url": photo_url,
        "uploadedBy": user_id,
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