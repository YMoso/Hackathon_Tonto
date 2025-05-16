from flask import Flask, render_template, send_from_directory, jsonify, request, redirect, url_for
from database_files import photo_get_group
from database_files import login
from database_files import register

user_data = ""
current_group = ""

app = Flask(__name__, template_folder='HTML_files')

@app.route('/')
def home():
    return render_template('main_page.html')

@app.route('/<path:filename>')
def base_static(filename):
    return send_from_directory('.', filename)

@app.route('/login_function', methods=['POST'])
def login(email, password):
    user_data = login.login_user(email, password)
    return redirect(url_for('home'))

@app.route('/register_function', methods=['POST'])
def register(email, password, name):
    user_data = register.register_user(email, password, name)
    return redirect(url_for('home'))

@app.route('/api/post_data')
def post_data():
    photos = photo_get_group.get_group_photos()

    return jsonify(photo_get_group.get_group_photos()),



if __name__ == '__main__':
    app.run(debug=True)