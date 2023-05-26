"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, User, Animal, Adoption

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

#GET ID
@api.route('/animal/<int:id>', methods=['GET'])
def get_animal_id(id):

    animal = Animal.query.get(id)
    if animal:
        return jsonify(animal.serialize()), 200
    else:
        return jsonify({"message": "Animal not found"}), 404

#POST
@api.route('/animal', methods=['POST'])
def post_animal():

    data = request.get_json()

    animal = Animal(nombre=data['nombre'], raza=data['raza'], edad=data['edad'], genero=data['genero'], descripcion=data['descripcion'])

    db.session.add(animal)
    db.session.commit()

    response_body = {"msg": "El animal fué añadido exitosamente"}
    return jsonify(response_body), 200

#DELETE
@api.route('/animal/<int:animal_id>', methods=['DELETE'])
def delete_animal(animal_id):
    
    animal = Animal.query.get(animal_id)

    if(animal):
        db.session.delete(animal)
        db.session.commit()
        return jsonify({'message': f'Animal: {animal_id} deleted successfully'})
    else:
        return jsonify({'message': f'Animal: {animal_id} not found'})

# USER----------------------------------------------------------

@api.route('/user', methods=['GET'])
def get_user():

    all_user = User.query.all()
    result = [element.serialize() for element in all_user]
    return jsonify(result), 200


@api.route('/user/<int:id>', methods=['GET'])
def get_one_user(id):

    user = User.query.get(id)
    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({"message": "User not found"}), 404
    

@api.route('/user', methods=['POST'])
def post_user():

    body = request.get_json()
    print("AQUÍ ESTÁ EL BODY: ", body)

    name = body['name']
    last_name = body['last_name']
    email = body['email']
    password = body['password']

    new_user = User(name=name, last_name=last_name, email=email, password=password)

    db.session.add(new_user)
    db.session.commit()

    response_body = {"message": "User created successfully"}

    return jsonify(response_body), 200

@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    
    user = User.query.get(user_id)

    if(user):
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': f'User: {user_id} deleted successfully'})
    else:
        return jsonify({'message': f'User: {user_id} not found'})
    
    
#ADOPTION--------------------------------------------------------

@api.route('/adoption', methods=['GET'])
def get_adoptions():

    all_adoptions = Adoption.query.all()
    result = [element.serialize() for element in all_adoptions]
    return jsonify(result), 200


@api.route('/adoption/<int:id>', methods=['GET'])
def get_one_adoption(id):

    adoption = Adoption.query.get(id)
    if adoption:
        return jsonify(adoption.serialize()), 200
    else:
        return jsonify({"message": "Adoption not found"}), 404
    

@api.route('/adoption/user/<int:user_id>/animal/<int:animal_id>', methods=['POST'])
def post_adoption(user_id, animal_id):

    body = request.get_json()
    user_id = body['user_id']
    animal_id = body['animal_id']
    submitted_date = body['submitted_date']
    status = body['status']

    user = User.query.get(user_id)
    animal = Animal.query.get(animal_id)

    if user is None or animal is None:
        response_body = {"message": "User or animal dont exist"}
        return jsonify(response_body), 404

    new_adoption = Adoption(user_id=user_id, animal_id=animal_id, submitted_date=submitted_date, status=status)

    db.session.add(new_adoption)
    db.session.commit()

    response_body = {"message": "Adoption created successfully"}

    return jsonify(response_body), 200


@api.route('/adoption/<int:adoption_id>', methods=['DELETE'])
def delete_adoption(adoption_id):
    
    adoption = Adoption.query.get(adoption_id)

    if adoption:
        db.session.delete(adoption)
        db.session.commit()
        return jsonify({'message': f'Adoption: {adoption_id} deleted successfully'})
    else:
        return jsonify({'message': f'Adoption: {adoption_id} not found'})

