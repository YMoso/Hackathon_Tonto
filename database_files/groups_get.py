import requests

DATABASE_URL = "https://hackaton-b34ea-default-rtdb.europe-west1.firebasedatabase.app/"

def get_user_group_ids(id_token, user_id):
    url = f"{DATABASE_URL}users/{user_id}/groups.json?auth={id_token}"
    response = requests.get(url)

    if response.status_code != 200:
        raise Exception("Failed to fetch groups:", response.json())

    all_groups = response.json()
    user_group_ids = []
    if not all_groups:
        return 0

    for group_id, group_data in all_groups.items():
        if group_data.get("users", {}).get(user_id):
            user_group_ids.append(group_id)

    return user_group_ids
