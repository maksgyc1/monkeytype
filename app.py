from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User
from flask_migrate import Migrate
import random
import psycopg2

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://elpepoid:kerry7856fak@localhost:5432/monkeytype'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key_here'
db.init_app(app)
migrate = Migrate(app, db)

@app.route('/', methods=['GET', 'POST'])
def main():
    return render_template('main.html')


login_manager = LoginManager(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username'][:80]
        password = request.form['password'][:120]
        user = User.query.filter_by(username=username).first()
        if (user==None):
            return render_template('login.html', c = 1)
        
        if user.password != password:
            return render_template('login.html', c = 1)
        
        if user and user.password == password:
            login_user(user)
            return redirect(url_for('home'))
        
    return render_template('login.html', c = 0)

@app.route('/home', methods=['GET', 'POST'])
def home():
    with open('text_for_monkeytype.txt', 'r') as file:
        text_file = file.read()
        array_file = text_file.split('. ')
        new_array_text = []
        for i in range(len(array_file)):
            if len(array_file[i]) > 20 and len(array_file[i]) < 85:
                new_array_text.append(array_file[i])
        proposal = random.choice(new_array_text)        
        text_to_type = proposal+'.'
 
    if 'upload_button' in request.form:
        username = current_user.username
        file = request.files['file']
        if file.filename == '':
            return render_template('home.html', text_to_type=text_to_type.strip())
        file.save(file.filename)
        User.query.filter_by(username=username).first().file_pols = file.filename 
        db.session.commit()
        
    if 'load_button' in request.form:
        username = current_user.username
        file_pols = User.query.filter_by(username=username).first().file_pols
        if file_pols == None:
            return render_template('home.html', text_to_type=text_to_type.strip())
        with open(file_pols, 'r') as file:
            text_file = file.read()           
            text_to_type = text_file
               
    return render_template('home.html', text_to_type=text_to_type.strip())


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username'][:80]
        password = request.form['password'][:120]
        email = request.form['email'][:120]
        # Проверяем, не существует ли уже пользователь с таким именем
        
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return render_template('register.html', c = 1)
        
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return render_template('register.html', c = 1)

        # Создаем нового пользователя
        new_user = User(username=username, password=password, email = email)

        # Сохраняем пользователя в базу данных
        db.session.add(new_user)
        db.session.commit()

        # Авторизуем пользователя после успешной регистрации
        login_user(new_user)
        return render_template('login.html', c = 0)

    return render_template('register.html', c = 0)

if __name__ == '__main__':
    app.run(debug=True)