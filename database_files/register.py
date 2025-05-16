import requests

FIREBASE_API_KEY = "AIzaSyDjw4uS6g8DIzjn68c4y0D-RSeq94VvaBs"
DATABASE_URL = "https://hackaton-b34ea-default-rtdb.europe-west1.firebasedatabase.app/"  # include trailing slash!


def register_user(email, password, name):
    # Step 1: Register with Firebase Auth
    signup_url = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={FIREBASE_API_KEY}"
    payload = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }
    response = requests.post(signup_url, json=payload)
    if response.status_code != 200:
        print("Failed to register user:", response.json())
        return None

    data = response.json()
    id_token = data["idToken"]
    local_id = data["localId"]

    # Step 2: Add user data to Realtime Database
    user_data = {
        "email": email,
        "name": name,
        "photos": "",  # Initially empty
        "groups": "",
        "challenges": "",
        "coins": "",
    }
    user_url = f"{DATABASE_URL}users/{local_id}.json?auth={id_token}"
    db_response = requests.put(user_url, json=user_data)
    if db_response.status_code != 200:
        print("Failed to add user to database:", db_response.json())
        return None

    print("User registered and added to database.")
    return {
        "localId": local_id,
        "idToken": id_token,
        "refreshToken": data["refreshToken"]
    }

