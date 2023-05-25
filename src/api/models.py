from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Animal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=False, nullable=False)
    raza = db.Column(db.String(80), unique=False, nullable=False)
    edad = db.Column(db.String(50), unique=False, nullable=False)
    genero = db.Column(db.String(50), unique=False, nullable=False)
    descripcion = db.Column(db.String(500), unique=False, nullable=False)

    def __repr__(self):
        return f'<Animal {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "raza": self.raza,
            "genero": self.genero,
            "descripcion": self.descripcion
            # do not serialize the password, its a security breach
        }