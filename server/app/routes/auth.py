from app.models import user_model
from flask import request, make_response
from app import app
import pymongo
import bcrypt
import json
from bson import json_util, ObjectId
from app.db_connection import db
user_collection = db['users']
staff_collection = db['admin']

from datetime import datetime, timedelta
import jwt

def generate_token(user_id):
    payload = {
        'exp': datetime.utcnow() + timedelta(days=1),
        'iat': datetime.utcnow(),
        'sub': str(user_id)
    }
    token = jwt.encode(payload, 'secret-key', algorithm='HS256')
    return token

def verify_token(token):
    verify = jwt.decode(token, 'secret-key', algorithms=["HS256"])
    return verify

@app.route('/signup', methods=['POST'])
def signup():
    if request.json:
            query = {"phone": request.json.get("phone")}
            values = user_model(request=request)
            password = values["password"]
            hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
            values["password"] = hashed.decode("utf-8")
            print(values)
            update = {
                "$set": values
            }

            result = user_collection.find_one_and_update(
                query,
                update=update,
                upsert=True,
                return_document=pymongo.ReturnDocument.AFTER
            )
            if result:
                return "Sign up successfull"
            else:
                return "Can't sign up this account. Try again."
    else:
        return "Body of the request is empty."



@app.route('/login/<auth>', methods=['POST'])
def login(auth):
    phone = request.json.get('phone')
    email = request.json.get('email')
    password = request.json.get('password')
    
    if not email or not password:
        return "Missing phone or password"
    
    if auth == 'user':
        cursor = user_collection.find_one({'phone': phone})
    else:
        cursor = staff_collection.find_one({'email': email})

    if not cursor:
        return "User not found"
    user = json.loads(json_util.dumps(cursor))

    if bcrypt.checkpw(password.encode("utf-8"), user['password'].encode("utf-8")):
        id = user['_id']
        token = generate_token(user_id=id['$oid'])
        resp = make_response("Login successful")
        resp.set_cookie(auth, token)
        return resp
    return 'Invalid email or password'


@app.route('/logout/<key>')
def logout(key):
    cookie = request.cookies.get(key)

    if cookie:
        resp = make_response("Logout successfull")
        resp.delete_cookie(key)
        return resp

    return "Cookie don't exist."

@app.route('/verify/<key>')
def verify(key):
    cookie = request.cookies.get(key)

    if cookie:
        token = verify_token(cookie)
        id = ObjectId(token['sub'])
        if key == 'user':
            cursor = user_collection.find_one({'_id': id})
        else:
            cursor = staff_collection.find_one({'_id': id})

        return json.loads(json_util.dumps(cursor))
    
    return "Not found token"