"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, User, Animal, Adoption, Asociacion, Favorite
from api.models import db, User, Animal, Adoption, Asociacion, Favorite

from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

import cloudinary
import cloudinary.uploader



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
    current_user = get_jwt_identity()
    
    # Verificar el tipo de usuario
    if 'apellido' in current_user:
        # Si es un USER (tiene la propiedad last_name)
        allAnimals = Animal.query
    elif 'CIF' in current_user:
        # Asociación (tiene la propiedad CIF)
        asociacion_id = current_user['id']
        allAnimals = Animal.query.filter_by(asociacion_id=asociacion_id)
    else:
        # Tipo de usuario no reconocido
        return jsonify({'message': 'Unrecognized user type'}), 400
    
    # Obtener los parámetros de paginación
    page = request.args.get('page', default=1, type=int)
    size = request.args.get('size', default=8, type=int)

    # Calcular los índices de inicio y fin para la paginación
    start_index = (page - 1) * size
    end_index = start_index + size

    # Aplicar la paginación a los resultados
    paginated_animals = allAnimals[start_index:end_index]

    result = [element.serialize() for element in paginated_animals]
    return jsonify(result), 200


# Ruta pública para obtener todos los animales en la Home

@api.route('/animal_public', methods=['GET'])
def get_animals_public():
    
        allAnimals = Animal.query.all()
        result = [element.serialize() for element in allAnimals]
        return jsonify(result), 200



##############################################################################################################

@api.route('/animal_public/<int:id>', methods=['GET'])
def get_animal_public_id(id):
    
    animal = Animal.query.get(id)

    if animal:
        return jsonify(animal.serialize()), 200
    else:
        return jsonify({"message": "Animal not found"}), 404



@api.route('/animal/<int:id>', methods=['GET'])
@jwt_required()
def get_animal_id(id):
    current_user = get_jwt_identity()
    animal = Animal.query.get(id)

    if animal:
        return jsonify(animal.serialize()), 200
    else:
        return jsonify({"message": "Animal not found"}), 404


#GET ID
# @api.route('/animal/<int:id>', methods=['GET'])
# @jwt_required()
# def get_animal_id(animal_id):

# # Obtengo el usuario al que pertenece el token JWT
#     current_asociacion = get_jwt_identity()

# # ID de usuario
#     current_asociacion_id = current_asociacion['id']
    
# # Filtramos por el user ya autentificado y añadimos id=id para buscar al animal en concreto.
#     animal = Animal.query.filter_by(id=animal_id, asociacion_id = current_asociacion_id).first()
    
#     if animal:
#         return jsonify(animal.serialize()), 200
#     else:
#         return jsonify({"message": "Animal not found"}), 404

#POST
@api.route('/animal', methods=['POST'])
@jwt_required()
def post_animal():
    current_asociacion = get_jwt_identity()
    current_asociacion_id = current_asociacion['id']

    animal_data = request.form

    animal = Animal(
        nombre=animal_data['nombre'],
        tipo_animal=animal_data['tipo_animal'],
        raza=animal_data['raza'],
        edad=animal_data['edad'],
        genero=animal_data['genero'],
        descripcion=animal_data['descripcion'],
        asociacion_id=current_asociacion_id
    )

    image_file = request.files['imagen']
    result = cloudinary.uploader.upload(image_file)
    animal.animal_image = result['secure_url']

    db.session.add(animal)
    db.session.commit()

    response_body = {"message": "The animal was added successfully"}
    return jsonify(response_body), 200


#PUT
# @api.route('/animal/<int:animal_id>', methods=['PUT'])
# @jwt_required()
# def put_animal(animal_id):
    
#         current_user = get_jwt_identity()
#         current_user_id = current_user['id']
    
#         animal = Animal.query.filter_by(id=animal_id, user_id=current_user_id).first()
    
#         if(animal):
#             data = request.get_json()
#             animal.nombre = data['nombre']
#             animal.raza = data['raza']
#             animal.edad = data['edad']
#             animal.genero = data['genero']
#             animal.descripcion = data['descripcion']
#             animal.tipo_animal = data['tipo_animal']
#             db.session.commit()
#             return jsonify(animal.serialize()), 200
#         else:
#             return jsonify({'message': f'Animal: {animal_id} not found'}), 404


@api.route('/animal/<int:animal_id>', methods=['PUT'])
@jwt_required()
def put_animal(animal_id):
    animal = Animal.query.get(animal_id)

    if animal:
        data = request.get_json()
        animal.nombre = data.get('nombre', animal.nombre)
        animal.raza = data.get('raza', animal.raza)
        animal.edad = data.get('edad', animal.edad)
        animal.genero = data.get('genero', animal.genero)
        animal.descripcion = data.get('descripcion', animal.descripcion)
        animal.tipo_animal = data.get('tipo_animal', animal.tipo_animal)
        db.session.commit()
        return jsonify(animal.serialize()), 200
    else:
        return jsonify({'message': f'Animal: {animal_id} not found'}), 404



#DELETE

@api.route('/animal/<int:animal_id>', methods=['DELETE'])
@jwt_required()
def delete_animal(animal_id):
    animal = Animal.query.get(animal_id)

    if animal:
        db.session.delete(animal)
        db.session.commit()
        return jsonify({'message': f'Animal: {animal_id} deleted successfully'})
    else:
        return jsonify({'message': f'Animal: {animal_id} not found'}), 404


# @api.route('/animal/<int:animal_id>', methods=['DELETE'])
# @jwt_required()
# def delete_animal(animal_id):

#     current_user = get_jwt_identity()
#     current_user_id = current_user['id']
    
#     # animal = Animal.query.filter_by(id=animal_id, user_id=current_user_id).first()
#     animal = Animal.query.filter_by(id=animal_id).first()

#     if(animal):
#         db.session.delete(animal)
#         db.session.commit()
#         return jsonify({'message': f'Animal: {animal_id} deleted successfully'})
#     else:
#         return jsonify({'message': f'Animal: {animal_id} not found'})

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
        "email": email,
        "user_id": user.id,
        "nombre": user.nombre,
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
@jwt_required()
def get_adoptions():
     current_user = get_jwt_identity()
     if 'apellido' in 'current_user':
         user_id = current_user['id']
         all_adoptions = Adoption.query.filter_by(user_id = user_id).all()
     elif 'CIF' in 'current_user':
         asociacion_id = current_user['id']
         all_adoptions = Adoption.query.filter_by(asociacion_id = asociacion_id).all()
     else:
         return jsonify({'message': 'Adoption not found'})
             
     
     result = [element.serialize() for element in all_adoptions]
     print(result)
     return jsonify(result), 200


@api.route('/adoption/<int:id>', methods=['GET'])
@jwt_required()
def get_one_adoption(id):
     
     current_user = get_jwt_identity()

     adoption = Adoption.query.get(id)
     if adoption:
        return jsonify(adoption.serialize()), 200
     else:
        return jsonify({"message": "Adoption not found"}), 404
    

@api.route('/adoption/user/<int:user_id>/animal/<int:animal_id>', methods=['POST'])
@jwt_required()
def post_adoption(user_id, animal_id):

    current_user = get_jwt_identity()


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
@jwt_required()
def delete_adoption(adoption_id):

    current_user = get_jwt_identity()
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
 
# #POST
# @api.route('/asociacion', methods=['POST'])
# def post_asociacion():
 
#         body = request.get_json()
 
#         asociacion = Asociacion(nombre=body['nombre'], email=body['email'], provincia = body['provincia'], CIF = body['CIF'], descripcion = body['descripcion'], password = body['password'])
 
#         db.session.add(asociacion)
#         db.session.commit()
 
#         response_body = {"msg": "La asociación fué añadida exitosamente"}
#         return jsonify(response_body), 200

#POST
@api.route('/asociacion', methods=['POST'])
def post_asociacion():

    body = request.get_json()

    nombre = body.get('nombre')
    email = body.get('email')
    provincia = body.get('provincia')
    CIF = body.get('CIF')
    descripcion = body.get('descripcion')
    password = body.get('password')

    asociacion = Asociacion(nombre=nombre, email=email, provincia=provincia, CIF=CIF, descripcion=descripcion, password=password)

    db.session.add(asociacion)
    db.session.commit()

    response_body = {"msg": "La asociación fue añadida exitosamente"}
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

# -------------------FAVORITE-------------------------

# GET
@api.route('/user/favorites', methods=['GET'])
@jwt_required()
def get_user_favorites():

    # Obtengo el usuario al que pertenece el token JWT
    current_user = get_jwt_identity()
    current_user_id = current_user['id']

    favorites = Favorite.query.filter_by(user_id=current_user_id).all()

    result = [element.serialize() for element in favorites]
            
    return jsonify(result), 200

# POST
@api.route('/user/favorites', methods=['POST'])
@jwt_required()
def add_favorite():

     # Obtengo el usuario al que pertenece el token JWT
    current_user = get_jwt_identity()
    current_user_id = current_user['id']

    body= request.get_json()
    animal_id = body['animal_id']

    user = User.query.get(current_user_id)
    animal = Animal.query.get(animal_id)

    # Verificar si el animal ya está marcado como favorito por el usuario
    existing_favorite = Favorite.query.filter_by(user=user, animal=animal).first()
    if existing_favorite:
        return jsonify({'message': 'Animal already in favorites'}), 400


    favorites = Favorite(user=user, animal=animal)

    db.session.add(favorites)
    db.session.commit()

    return jsonify({'message':'Favorite added successfully'})


# DELETE

@api.route('/user/favorites/<int:favorite_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(favorite_id):

    print("Favorite ID:", favorite_id)

    current_user = get_jwt_identity()
    favorite = Favorite.query.get(favorite_id)

    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({'message': f'Favorite: {favorite_id} deleted successfully'})
    else:
        return jsonify({'message': f'Favorite: {favorite_id} not found'})

#UPLOAD -----------------------------------------------------------------------------------------
@api.route('/upload', methods=['POST'])
def handle_upload():

    #print(request.files)
    animal1 = Animal.query.get(1)
    result = cloudinary.uploader.upload(request.files["animal_image"])
    print(result['secure_url'])

    animal1.animal_image = result['secure_url']

    db.session.add(animal1)
    db.session.commit()

    return jsonify("Todo bien bro"), 200
