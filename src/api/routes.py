"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Animal
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#ANIMAL ENDPOINT -------------------------------------------------------------------
#GET
@api.route('/animal', methods=['GET'])
def get_animals():
    allAnimals = Animal.query.all()
    result = [element.serialize() for element in allAnimals]
    return jsonify(result), 200

#POST
@api.route('/animal', methods=['POST'])
def post_animal():

    # obtener los datos de la petición que están en formato JSON a un tipo de datos entendibles por pyton (a un diccionario). En principio, en esta petición, deberían enviarnos 3 campos: el nombre, la descripción del planeta y la población
    data = request.get_json()

    # creamos un nuevo objeto de tipo Planet
    animal = Animal(nombre=data['nombre'], raza=data['raza'], edad=data['edad'], genero=data['genero'], descripcion=data['descripcion'])

    # añadimos el planeta a la base de datos
    db.session.add(animal)
    db.session.commit()

    response_body = {"msg": "El animal fué añadido exitosamente"}
    return jsonify(response_body), 200