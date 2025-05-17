import requests

DATABASE_URL = "https://hackaton-b34ea-default-rtdb.europe-west1.firebasedatabase.app/"


def join_group(id_token, user_id, group_name, key):
    all_groups_url = f"{DATABASE_URL}groups.json?auth={id_token}"
    groups_response = requests.get(all_groups_url)

    if groups_response.status_code != 200:
        raise Exception("Failed to fetch groups")

    groups_data = groups_response.json()
    print("📦 All groups data:", groups_data)

    print(f"📥 Input group_name: '{group_name}', key: '{key}'")

    group_id = None
    for gid, group in groups_data.items():
        print(f"🔎 Checking group: '{group.get('group_name')}', key: '{group.get('key')}'")
        if group.get('group_name') == group_name and group.get('key') == key:
            group_id = gid
            break

    if not group_id:
        print("❌ Group not found or invite key incorrect.")
        return 0

    group_user_url = f"{DATABASE_URL}groups/{group_id}/users/{user_id}.json?auth={id_token}"
    group_user_response = requests.put(group_user_url, json=user_id)

    if group_user_response.status_code != 200:
        print("❌ Failed to add user to group.")
        return 0

    user_group_url = f"{DATABASE_URL}users/{user_id}/groups/{group_id}.json?auth={id_token}"
    user_group_response = requests.put(user_group_url, json=True)

    if user_group_response.status_code != 200:
        print("❌ Failed to update user's group list.")
        return 0

    print(f"✅ User {user_id} successfully joined group '{group_name}' with ID {group_id}")
    return 1