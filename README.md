# 📸 Hackathon Project – Photo Calendar App

This is a web-based calendar app built during a hackathon, designed to help users track daily habits and goals using a visual calendar of uploaded photos. Users can join groups, view progress streaks, and receive motivation through an engaging interface.

---

## 🚀 Features

- 📅 Interactive photo-based calendar
- 👥 Group management and daily challenges
- 🔥 Streak tracking with progress feedback
- 🧠 Motivational mindset messages with animation
- 📷 Daily photo uploads mapped to dates
- 🤖 AI module for personalized suggestions *(experimental)*

---

## 🧩 Project Structure

```
Hackathon/
│
├── main_python.py                # Main backend logic
├── requirements.txt              # Core dependencies
├── requirements1.txt             # Possibly extended/dev dependencies
├── database_files/               # Python scripts for DB/API interaction
│   ├── login.py
│   ├── register.py
│   ├── photo_add.py
│   └── ...
├── templates/                    # HTML + CSS UI templates (calendar, groups, etc.)
│   └── calendar.css, groups.css, ...
├── Logic/                        # JavaScript logic (calendar.js, footer.js)
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/hackathon-photo-calendar.git
cd hackathon-photo-calendar/Hackathon
```

### 2. Create a virtual environment (optional but recommended)

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the app

```bash
python main_python.py
```

---

## 📦 Requirements

See [`requirements.txt`](./requirements.txt) for the full list of dependencies. This likely includes:

- Flask (or another backend framework)
- SQLite or other DB connector
- Standard libraries for web handling and data I/O

---

## 🤖 AI Features

The `ai.py` file in `database_files/` suggests there is experimental functionality related to AI — possibly for personalized messages or recommendations. This may be optional or in progress.

---

## 🛠️ To Do

- Improve mobile responsiveness
- Add user profile editing
- Implement full user auth flow (login/register)
- Polish AI goal suggestions
- Deploy on a cloud platform (e.g., Vercel, Heroku, or PythonAnywhere)

---

## 🧑‍💻 Authors

Project built during a hackathon by a team of developers from [Your University Name].

