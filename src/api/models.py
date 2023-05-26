from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False,nullable=False)
    last_name = db.Column(db.String(120), unique=False,nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def validate_password(self, password):
        if len(password) < 6:
            return "La contraseña debe tener al menos 6 caracteres."
    

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "last_name" : self.last_name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Adoption(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
        # animal_id = db.Column(db.Integer, db.ForeignKey('animal.id'), nullable=False)
        date = db.Column(db.Date, default=datetime.datetime.now(), nullable=False)
        status = db.Column(db.String(80), unique=False, nullable=False)


        user = relationship('User', backref='adoptions')
        # animal = relationship('Animal', backref='adoptions')

        def __repr__(self):
            return f'{self.user.name} - {self.date}'
        # En cuanto Miguel meta la tabla Animal, añadir :   - {self.animal.name} y descomentar relationship línea 39 y 33
