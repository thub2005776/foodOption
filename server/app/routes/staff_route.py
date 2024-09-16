from app.models import user_model
from flask import request
from flask.views import MethodView
from app import app
import pymongo
import json
import bcrypt
from bson import json_util, ObjectId
from app.db_connection import db
staff_collection = db['staff']


class StaffList(MethodView):
    def get(self):
        cursor = staff_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any staff account."

    def post(self):
        if request.json:
            query = {"email": request.json.get("email")}
            values = user_model(request=request)
            password = values["password"]
            hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
            values["password"] = hashed.decode("utf-8")
            print(values)
            update = {
                "$set": values
            }

            result = staff_collection.find_one_and_update(
                query,
                update=update,
                upsert=True,
                return_document=pymongo.ReturnDocument.AFTER
            )
            if result:
                return "successfull"
            else:
                return "Can't insert the staff. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = staff_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all staffs. Try again."


class StaffInfo(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = staff_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The staff account don't exist."
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
                    result = staff_collection.find_one_and_update(
                        query,
                        update=update,
                        upsert=True,
                        return_document=pymongo.ReturnDocument.AFTER
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the staff info. Try again."
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
                result = staff_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the staff info. Try again."
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
                    result = staff_collection.find_one_and_update(
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
        
app.add_url_rule('/api/acc/staff', view_func=StaffList.as_view("staffList"))
app.add_url_rule('/api/acc/staff/<id>', view_func=StaffInfo.as_view("staffInfo"))
app.add_url_rule('/api/acc/staff/pw/<id>', view_func=UpdatePassword.as_view("UpdatePasswordStaff"))