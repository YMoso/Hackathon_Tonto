import requests

DATABASE_URL = "https://hackaton-b34ea-default-rtdb.europe-west1.firebasedatabase.app/"

def get_user_group_ids(id_token, user_id):
    url = f"{DATABASE_URL}users/{user_id}/groups.json?auth={id_token}"
    response = requests.get(url)

    if response.status_code != 200:
        raise Exception("Failed to fetch groups:", response.json())

    all_groups = response.json()
    if not all_groups:
        return []

    # Since each group is just "group_id: true", return the keys directly
    return list(all_groups.keys())
