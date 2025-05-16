from flask import Flask, render_template, send_from_directory, jsonify, request, redirect, url_for, session
from database_files import photo_get_group
from database_files import login
from database_files import register
from database_files import groups_get
from database_files import profile_get
from database_files import photo_get_calendar
import secrets


user_data = ""
current_group = ""



app = Flask(__name__, template_folder='HTML_files')
app.secret_key = secrets.token_hex(32)


@app.route('/')
def login_page():
    return render_template('login.html')

@app.route('/home')
def home():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('main_page.html')

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

@app.route('/api/calendar-images')
def calendar_images():
    # Sample logic, replace with real DB fetch
    image_map = photo_get_calendar.get_user_photos(session['idToken'], session['user_id'])
    return jsonify(image_map)

@app.route('/create-group')
def create_group():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    return render_template('creating_group.html')

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
    name = session.get('name', 'Guest')
    return render_template('profile.html', username=name)

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

@app.route('/api/post_data')
def post_data():
    if 'userId' not in session:
        return redirect(url_for('login_page'))
    photos = photo_get_group.get_group_photos()

    return jsonify(photo_get_group.get_group_photos()),

@app.route('/templates/<path:filename>')
def serve_css(filename):
    return send_from_directory('templates', filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('Logic', filename)


if __name__ == '__main__':
    app.run(debug=True)