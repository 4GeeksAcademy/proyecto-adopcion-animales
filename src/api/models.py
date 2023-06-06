from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=False, nullable=False)
    apellido = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    chus = db.Column(db.String(80), unique=False, nullable=False)


    def validate_password(self, password):
        if len(password) < 6:
            return "La contraseña debe tener al menos 6 caracteres."

    def __repr__(self):
        return f'<User {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email": self.email
            # do not serialize the password, it's a security breach
        }

class Animal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=False, nullable=False)
    tipo_animal = db.Column(db.String(50), unique=False, nullable=False) 
    raza = db.Column(db.String(80), unique=False, nullable=False)
    edad = db.Column(db.String(50), unique=False, nullable=False)
    genero = db.Column(db.String(50), unique=False, nullable=False)
    descripcion = db.Column(db.String(500), unique=False, nullable=False)
    asociacion_id = db.Column(db.Integer, db.ForeignKey('asociacion.id'), unique=False, nullable=False)

    asociacion = db.relationship('Asociacion', backref='animals')

    def __repr__(self):
        return f'<Animal {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "tipo_animal": self.tipo_animal,
            "raza": self.raza,
            "genero": self.genero,
            "descripcion": self.descripcion,
            "edad": self.edad,
            "asociacion_nombre": self.asociacion_nombre
            # do not serialize the password, it's a security breach
        }
    
class Asociacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(80), unique=False, nullable=False)
    provincia = db.Column(db.String(80), unique=False, nullable=False)
    CIF = db.Column(db.String(80), unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<Asociacion {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email,
            "provincia": self.provincia,
            "CIF": self.CIF
            # do not serialize the password, it's a security breach
        }


class Adoption(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey('animal.id'), nullable=False)
    date = db.Column(db.Date, default=datetime.datetime.now(), nullable=False)
    status = db.Column(db.String(80), unique=False, nullable=False)

    user = db.relationship('User', backref='adoptions')
    animal = db.relationship('Animal', backref='adoptions')

    def __repr__(self):
        return f'{self.user.nombre} - {self.animal.nombre} - {self.date} '


class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey('animal.id'), nullable=False)
    insertion_date = db.Column(db.Date, default=datetime.datetime.now())

    user = db.relationship('User', backref='favorites')
    animal = db.relationship('Animal', backref='favorites')

    #def __repr__(self):
        #return f'{self.user.nombre} - {self.animal.nombre} - {self.insertion_date}'
