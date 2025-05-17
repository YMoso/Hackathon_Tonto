import requests
import time

FIREBASE_API_KEY = "AIzaSyDjw4uS6g8DIzjn68c4y0D-RSeq94VvaBs"
DATABASE_URL = "https://hackaton-b34ea-default-rtdb.europe-west1.firebasedatabase.app/"

def create_group_db(id_token, user_id, group_name, key):
    # Step 1: Create group entry with auto-generated key
    group_data = {
        "group_name": group_name,
        "users": {
            user_id: user_id
        },
        "key": key,
        "photos": {},
    }

    group_post_url = f"{DATABASE_URL}groups.json?auth={id_token}"
    response = requests.post(group_post_url, json=group_data)
    if response.status_code != 200:
        raise Exception("Failed to create group:", response.json())

    group_id = response.json()["name"]  # Firebase returns the generated key

    # Step 2: Add group ID to user's group list
    user_group_url = f"{DATABASE_URL}users/{user_id}/groups/{group_id}.json?auth={id_token}"
    group_ref_response = requests.put(user_group_url, json=True)
    if group_ref_response.status_code != 200:
        raise Exception("Failed to update user's group list:", group_ref_response.json())

    print(f"Group '{group_name}' created with ID: {group_id}")
    return group_id