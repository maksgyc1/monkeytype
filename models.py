from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    file_pols = db.Column(db.TEXT)

    def get_id(self):
        return str(self.id)
    
    def __repr__(self):
        return f'<User {self.username}>'

    def is_active(self):

            return True