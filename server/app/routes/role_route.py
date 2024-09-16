from app.models import role_model
from flask import request
from flask.views import MethodView
from app import app
import pymongo
import json
import bcrypt
from bson import json_util, ObjectId
from app.db_connection import db
role_collection = db['roles']


class RoleList(MethodView):
    def get(self):
        cursor = role_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any role."

    def post(self):
        if request.json:
            query = {"role": request.json.get("role")}
            values = role_model(request=request)
            update = {
                "$set": values
            }

            result = role_collection.find_one_and_update(
                query,
                update=update,
                upsert=True,
                return_document=pymongo.ReturnDocument.AFTER
            )
            if result:
                return "successfull"
            else:
                return "Can't insert the role. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = role_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all roles. Try again."


class roleInfo(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = role_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The role don't exist."
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
                        "$set": role_model(request=request)
                    }
                    result = role_collection.find_one_and_update(
                        query,
                        update=update,
                        upsert=True,
                        return_document=pymongo.ReturnDocument.AFTER
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the role info. Try again."
                else:
                    return "Body of the request is empty."
            else:
                return "ID (ObjectId) pamram is required."
        except:
            return "ID (ObjectId) pamram is required."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                result = role_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the role info. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."

       
app.add_url_rule('/api/role', view_func=RoleList.as_view("roleList"))
app.add_url_rule('/api/role/<id>', view_func=roleInfo.as_view("roleInfo"))