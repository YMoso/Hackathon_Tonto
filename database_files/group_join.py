import requests

DATABASE_URL = "https://hackaton-b34ea-default-rtdb.europe-west1.firebasedatabase.app/"

def join_group(id_token, user_id, group_id):
    # 1. Add user to group's user list
    group_user_url = f"{DATABASE_URL}groups/{group_id}/users/{user_id}.json?auth={id_token}"
    group_user_response = requests.put(group_user_url, json=True)

    if group_user_response.status_code != 200:
        raise Exception("Failed to add user to group:", group_user_response.json())

    # 2. Add group to user's group list
    user_group_url = f"{DATABASE_URL}users/{user_id}/groups/{group_id}.json?auth={id_token}"
    user_group_response = requests.put(user_group_url, json=True)

    if user_group_response.status_code != 200:
        raise Exception("Failed to add group to user's list:", user_group_response.json())

    print(f"✅ User {user_id} successfully joined group {group_id}")
