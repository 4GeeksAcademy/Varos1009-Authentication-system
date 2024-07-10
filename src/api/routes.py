"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db,  User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required



api = Blueprint('api', __name__)



# Allow CORS requests to this API
CORS(api)


@api.route('/user', methods=['POST'], endpoint='create_user')
def create_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and Password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 400
    
    new_user = User(email=email, password=password,is_active=True)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as ex:
        db.session.rollback()
        return jsonify({"message": "Something went wrong", "error": str(ex)}), 500
    
    return jsonify(new_user.serialize()), 201

@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    id_user = get_jwt_identity()
    user = User.query.get(id_user)
    user = user.serialize()
    return jsonify({'user':user})


@api.route('/token', methods=['POST','GET'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email,password=password).first()
    user=user.serialize()
    access_token = create_access_token(identity=user['id'])
    return jsonify(access_token=access_token)


  