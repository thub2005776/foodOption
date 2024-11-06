from app.models import user_model, address_model
from flask import request
from flask.views import MethodView
from app import app
import pymongo
import json
import bcrypt
from bson import json_util, ObjectId
from app.db_connection import db
from app.routes.cart_route import CartByUid
from app.routes.address_route import UserAddressByUid
user_collection = db['user']

class Users(MethodView):
    def get(self):
        cursor = user_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any user account."

    def post(self):
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
            )
            if result:
                return "successfull"
            else:
                return "Can't insert the user. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = user_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all users. Try again."


class UserInfo(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = user_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The user account don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def post(self, id):
        try:
            if id and ObjectId(id):
                print(id)
                query = {"_id": ObjectId(id)}
                if request.get_json:
                    update = {
                        "$set": user_model(request=request)
                    }
                    result = user_collection.find_one_and_update(
                        query,
                        update=update,
                        upsert=True,
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the user info. Try again."
                else:
                    return "Body of the request is empty."
            else:
                return "ID (ObjectId) pamram is required."
        except:
            return "excecpt."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                result = user_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the user info. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."


class UpdatePassword(MethodView):
    def post(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                if request.json.get("password"):
                    password = request.json.get("password")
                    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
                    update = {
                        "$set": {"password": hashed.decode("utf-8")}
                    }
                    result = user_collection.find_one_and_update(
                        query,
                        update=update,
                        upsert=True,
                        return_document=pymongo.ReturnDocument.AFTER
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update new your password. Try again."
                else:
                    return "Body of the request is empty."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."



        
app.add_url_rule('/api/acc/user', view_func=Users.as_view("Users"))
app.add_url_rule('/api/acc/user/<id>', view_func=UserInfo.as_view("UserInfo"))
app.add_url_rule('/api/acc/user/pw/<id>', view_func=UpdatePassword.as_view("UpdatePassword"))