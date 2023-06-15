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
    image_url = db.Column(db.String(500), default='https://img.freepik.com/vector-gratis/ilustracion-dibujos-animados-lindo-perro-gato-lindo_138676-3238.jpg?w=826&t=st=1685726659~exp=1685727259~hmac=a431aa59abb1642efdeb6cfc2deca33296a142d07ce35860158892c6d5ef97e1', nullable=False)  
    asociacion_id = db.Column(db.Integer, db.ForeignKey('asociacion.id'), unique=False, nullable=False)

    asociacion = db.relationship('Asociacion', backref='animals')

    def __repr__(self):
        return f'{self.nombre} - {self.asociacion.nombre}'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "tipo_animal": self.tipo_animal,
            "raza": self.raza,
            "genero": self.genero,
            "descripcion": self.descripcion,
            "edad": self.edad,
            "image_url": self.image_url,
            "asociacion_id": self.asociacion_id,
            "asociacion_nombre": self.asociacion.nombre,
            "asociacion_provincia": self.asociacion.provincia,
            "asociacion_email": self.asociacion.email,
            # do not serialize the password, it's a security breach
        }



class Adoption(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey('animal.id'), nullable=False)
    asociacion_id = db.Column(db.Integer, db.ForeignKey('asociacion.id'), nullable=False)
    date = db.Column(db.Date, default=datetime.datetime.now(), nullable=False)
    status = db.Column(db.String(80), unique=False, nullable=False)
    user = db.relationship('User', backref='adoptions')
    animal = db.relationship('Animal', backref='adoptions')
    asociacion = db.relationship('Asociacion', backref='adoptions')

    def __repr__(self):
        return f'{self.user.nombre} - {self.animal.nombre} - {self.date} '
    

class Asociacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(80), unique=False, nullable=False)
    provincia = db.Column(db.String(80), unique=False, nullable=False)
    CIF = db.Column(db.String(80), unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    image_url = db.Column(db.String(500), default='https://img.freepik.com/vector-gratis/agrega-amigos-red-social-internet-comunidad-ilustracion-amistad-web_1284-47694.jpg?w=826&t=st=1685727734~exp=1685728334~hmac=73ee31dafe900f83498edb4195355135f4937c2f55c68ab40aa53561b45cf832', nullable=False)  
    
 
    def __repr__(self):
        return f'<Asociacion {self.nombre}>'
 
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email,
            "provincia": self.provincia,
            "CIF": self.CIF,
            "image_url": self.image_url
            # do not serialize the password, its a security breach
        }    
    
class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey('animal.id'), nullable=False)
    date = db.Column(db.Date, default=datetime.datetime.now())

    user = db.relationship('User', backref='favorites')
    animal = db.relationship('Animal', backref='favorites')

    def __repr__(self):
        return f'{self.user.nombre} - {self.animal.nombre} - {self.date}'


    def serialize(self):
        return {
            'id':self.id,
            'date': self.date.strftime('%Y-%m-%d'),  # Convierte la fecha a formato string
            'user': self.user.nombre,
            'animal': self.animal.serialize() if self.animal else None
            
        }
