from flask import Flask, render_template, send_from_directory, jsonify, request, redirect, url_for, session, render_template_string
from werkzeug.utils import secure_filename
from database_files import photo_get_group
from database_files import login
from database_files import register
from database_files import groups_get
from database_files import profile_get
from database_files import photo_get_calendar
from database_files import group_add
from database_files import group_join
from database_files import photo_add
import secrets
import os

UPLOAD_FOLDER = 'Images'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
user_data = ""
current_group = ""


app = Flask(__name__, template_folder='HTML_files')
app.secret_key = secrets.token_hex(32)


@app.route('/')
def login_page():
    return render_template('login.html')

@app.route('/register')
def register_page():
    return render_template('register.html')

@app.route('/home')
def home():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('main_page.html')


@app.route('/upload_photo')
def upload_photo():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('upload_photo.html')

@app.route('/api/posts', methods=['POST'])
def post_add():
    img = request.files['img']
    caption = request.form['caption']
    filename = secure_filename(img.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    img.save(filepath)
    photoId = photo_add.add_photo_to_group(session['idToken'], session['userId'], filepath, caption)
    return render_template('main_page.html')


@app.route('/api/add_posts', methods=['POST'])
def add_posts():
    posts = photo_get_group.get_group_photos(session['idToken'], session['userId'])
    return jsonify(posts)

@app.route('/footer')
def footer():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return send_from_directory('HTML_files', 'footer.html')


@app.route('/calendar')
def calendar():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('calendar.html')

@app.route('/join_priv_group')
def priv_group():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('join_priv_group.html')

@app.route('/join_priv_group_start')
def priv_group_start():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('join_priv_group_start.html')


@app.route('/join_pub_group')
def pub_group():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('join_pub_group.html')


@app.route('/join_pub_group_start')
def pub_group_start():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('join_pub_group_start.html')


@app.route('/api/calendar-images', methods=['POST'])
def calendar_images():
    # Sample logic, replace with real DB fetch
    image_map = photo_get_calendar.get_user_photos(session['idToken'], session['userId'])
    return jsonify(image_map)

@app.route('/create-group')
def create_group():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('create_group.html')

@app.route('/api/create-group', methods=['POST'])
def add_group():
    groupName = request.form['groupName']
    key = request.form['key']
    groupId = group_add.create_group_db(session['idToken'],session['userId'], groupName, key)
    return render_template('main_page.html')


@app.route('/group')
def show_group():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('group.html')

@app.route('/api/join-priv-group', methods=['POST'])
def join_priv_group():
    groupName = request.form['groupName']
    key = request.form['key']
    joined = group_join.join_group(session['idToken'],session['userId'], groupName, key)
    if joined == 1:
        return render_template('main_page.html')
    else:
        return render_template('login.html')


@app.route('/create-group_start')
def create_group_start():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('create_group_start.html')


@app.route('/groups')
def groups():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('groups.html')

@app.route('/group_options')
def group_options():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('group_options.html')

@app.route('/profile')
def profile():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('profile.html')

@app.route('/profile_name', methods=['POST'])
def profile_name():
    name = session.get('name', 'Guest')
    return jsonify(name)

@app.route('/challanges')
def challanges():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('challenge.html')

@app.route('/challanges_result', methods=['POST'])
def challanges_result():

    q1 = request.form['q1']
    q2= request.form['q2']
    q3= request.form['q3']
    q4= request.form['q4']
    q5= request.form['q5']
    q6= request.form['q6']
    q7= request.form['q7']
    q8= request.form['q8']
    prompt = f"Na podstawie, odpowiedzi z ankiety zaproponuj wyzwanie które ma pomoc użytkownikowi w dazeniu do lepszego siebie: 1. Jak opisał(a)byś swój obecny stan psychiczny? odp: {q1} 2.Jak wygląda Twój typowy dzień? odp:{q2} 3.W jaki sposób zazwyczaj ładujesz baterie? od:{q3} 4.Co najbardziej chciał(a)byś teraz poprawić? odp {q4} 5.Ile czasu możesz realistycznie poświęcić na codzienną aktywność? odp: {q5} 6.Jakiego rodzaju aktywności są dla Ciebie najbardziej wykonalne? odp:{q6} 7.Czy obecnie korzystasz z terapii lub narzędzi wspierających zdrowie psychiczne? odp: {q7} 8.Co dziś byłoby dla Ciebie „sukcesem”? odp: {q8}"

    result = "Idz pobiegac, ewidentnie"
    print(result)
    return render_template_string(f"""
        <script>
          alert({repr(result)});
        </script>
        """)

@app.route('/<path:filename>')
def base_static(filename):
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return send_from_directory('.', filename)

@app.route('/login_function', methods=['POST'])
def login_func():
    global user_data
    email = request.form['email']
    password = request.form['password']
    user_data = login.login_user(email, password)
    if user_data:
        print(user_data)
        session['idToken'] = user_data['idToken']
        session['userId'] = user_data['localId']
        session['name'] = profile_get.get_user_name(session['idToken'], session['userId'])
        groups_list = groups_get.get_user_group_ids(session['idToken'], session['userId'])
        if groups_list:
            return redirect(url_for('home'))
        else:
            return redirect(url_for('group_options'))
    else:
        return None

@app.route('/register_function', methods=['POST'])
def register_func():
    global user_data
    email = request.form['email']
    password = request.form['password']
    name = request.form['name']
    user_data = register.register_user(email, password, name)
    if user_data:
        print(user_data)
        session['userId'] = user_data['localId']
        session['idToken'] = user_data['idToken']
        session['email'] = email
        session['name'] = name
        groups_list = groups_get.get_user_group_ids(session['idToken'], session['userId'])
        if groups_list:
            return redirect(url_for('home'))
        else:
            return redirect(url_for('group_options'))
    else:
        return None

@app.route('/templates/<path:filename>')
def serve_css(filename):
    return send_from_directory('templates', filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('Logic', filename)


if __name__ == '__main__':
    app.run(debug=True)