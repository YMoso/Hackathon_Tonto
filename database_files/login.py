import requests

FIREBASE_API_KEY = "AIzaSyDjw4uS6g8DIzjn68c4y0D-RSeq94VvaBs"

def login_user(email, password):
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_API_KEY}"
    payload = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }

    response = requests.post(url, json=payload)
    if response.status_code == 200:
        data = response.json()
        print("Login successful!")
        return {
            "idToken": data["idToken"],
            "refreshToken": data["refreshToken"],
            "localId": data["localId"]
        }
    else:
        print("Login failed:", response.json())
        return None


#login_result = login_user("najgorzej111@gmail.com", "Mieszko123!")
#print(login_result)