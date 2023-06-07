"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, User, Animal, Adoption, Asociacion

from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

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
@jwt_required()
def get_animals():

# Obtengo el usuario al que pertenece el token JWT
    current_user = get_jwt_identity()
# ID de usuario
    current_user_id = current_user['id']

# Hacemos petición de todos los animales, filtrando por el usuario ya autentificado
    allAnimals = Animal.query.filter_by(user_id=current_user_id).all()
    result = [element.serialize() for element in allAnimals]
    return jsonify(result), 200

#GET ID
@api.route('/animal/<int:id>', methods=['GET'])
@jwt_required()
def get_animal_id(animal_id):

# Obtengo el usuario al que pertenece el token JWT
    current_user = get_jwt_identity()

# ID de usuario
    current_user_id = current_user['id']
    
# Filtramos por el user ya autentificado y añadimos id=id para buscar al animal en concreto.
    animal = Animal.query.filter_by(id=animal_id, user_id = current_user_id).first()
    
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
@jwt_required()
def delete_animal(animal_id):

    current_user = get_jwt_identity()
    current_user_id = current_user['id']
    
    animal = Animal.query.filter_by(id=animal_id, user_id=current_user_id).first()

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

    nombre = body['nombre']
    apellido = body['apellido']
    email = body['email']
    password = body['password']

    new_user = User(nombre=nombre, apellido=apellido, email=email, password=password)

    db.session.add(new_user)
    db.session.commit()

    response_body = {"message": "User created successfully"}

    return jsonify(response_body), 200


@api.route('/login_user', methods=['POST'])
def login_user():
# obtenemos los datos desde el lado cliente
    body = request.get_json()
    email = body['email']
    password = body['password']

# Comprobar si exisate el usuario en la base de datos
    user = User.query.filter_by(email=email, password=password).first()

    if user == None:
          return jsonify({"msg": "User or password, Not exist!"}), 401

# Flask crea un nuevo token JWT. Se lo guarda en su base de datos y lo asocia al usuario que hemos recuperado de la base de datos
    access_token = create_access_token(identity=user.serialize())

# Devolvemos el token (string) al cliente para que en futuras peticiones a nuestros endpoints protegidos se pueda autentificar
    
    response_body = {
        "msg": "Token create successfully",
        "token": access_token,
        "email": email
    }

    return jsonify(response_body), 200


# DELETE USER 
@api.route('/user/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):

    current_user=get_jwt_identity()
    current_user_id= current_user['id']

    
    user = User.query.get(user_id)

    if user:
        if user.id == current_user_id:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': f'User: {user_id} deleted successfully'})
        else:
            return jsonify({'message': 'Unauthorized'}), 401
    else:
        return jsonify({'message': f'User: {user_id} not found'}), 404
    
    
#ADOPTION--------------------------------------------------------

@api.route('/adoption', methods=['GET'])
def get_adoptions():
     all_adoptions = Adoption.query.all()
     result = [element.serialize() for element in all_adoptions]
     print(result)
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



# ASOCIACIÓN----------------------------------------------------------

#GET
@api.route('/asociacion', methods=['GET'])
def get_asociations():
    allAsociations = Asociacion.query.all()
    result = [element.serialize() for element in allAsociations]
    return jsonify(result), 200
 
#GET ID
@api.route('/asociacion/<int:id>', methods=['GET'])
def get_asociation_id(id):
 
    asociation = Asociacion.query.get(id)
    if asociation:
        return jsonify(asociation.serialize()), 200
    else:
        return jsonify({"message": "Asociation not found"}), 404
 
#POST
@api.route('/asociacion', methods=['POST'])
def post_asociacion():
 
        body = request.get_json()
 
        asociacion = Asociacion(nombre=body['nombre'], email=body['email'], provincia = body['provincia'], CIF = body['CIF'], password = body['password'])
 
        db.session.add(asociacion)
        db.session.commit()
 
        response_body = {"msg": "La asociación fué añadida exitosamente"}
        return jsonify(response_body), 200


#DELETE
@api.route('/asociacion/<int:asociacion_id>', methods=['DELETE'])
@jwt_required()
def delete_asociacion(asociacion_id):

    current_asociacion = get_jwt_identity()
    current_asociacion_id = current_asociacion['id']
    
    asociacion = Asociacion.query.get(asociacion_id)

    if asociacion:
        if asociacion.id == current_asociacion_id:
            db.session.delete(asociacion)
            db.session.commit()
            return jsonify({'message': f'Association: {asociacion_id} deleted successfully'})
        else:
            return jsonify({'message': 'Unauthorized'}), 401
    else:
        return jsonify({'message': f'Association: {asociacion_id} not found'}), 404
    

# LOGIN_ASOCIACION
@api.route('/login_asociacion', methods=['POST'])
def login_asociacion():
# obtenemos los datos desde el lado cliente
    body = request.get_json()
    email = body['email']
    password = body['password']

# Comprobar si exisate el usuario en la base de datos
    asociacion = Asociacion.query.filter_by(email=email, password=password).first()

    if asociacion == None:
          return jsonify({"msg": "association or password, Not exist!"}), 401

# Flask crea un nuevo token JWT. Se lo guarda en su base de datos y lo asocia al usuario que hemos recuperado de la base de datos
    access_token = create_access_token(identity=asociacion.serialize())

# Devolvemos el token (string) al cliente para que en futuras peticiones a nuestros endpoints protegidos se pueda autentificar
    
    response_body = {
        "msg": "Token create successfully", 
        "token": access_token,
        "email": email
    }

    return jsonify(response_body), 200
