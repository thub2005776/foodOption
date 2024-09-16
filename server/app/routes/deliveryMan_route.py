from app.models import user_model
from flask import request
from flask.views import MethodView
from app import app
import pymongo
import json
import bcrypt
from bson import json_util, ObjectId
from app.db_connection import db
deliveryMan_collection = db['deliveryMan']


class DeliveryManList(MethodView):
    def get(self):
        cursor = deliveryMan_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any deliveryMan account."

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

            result = deliveryMan_collection.find_one_and_update(
                query,
                update=update,
                upsert=True,
                return_document=pymongo.ReturnDocument.AFTER
            )
            if result:
                return "successfull"
            else:
                return "Can't insert the deliveryMan. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = deliveryMan_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all deliveryMans. Try again."


class DeliveryManInfo(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = deliveryMan_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The deliveryMan account don't exist."
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
                    result = deliveryMan_collection.find_one_and_update(
                        query,
                        update=update,
                        upsert=True,
                        return_document=pymongo.ReturnDocument.AFTER
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the deliveryMan info. Try again."
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
                result = deliveryMan_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the deliveryMan info. Try again."
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
                    result = deliveryMan_collection.find_one_and_update(
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
        
app.add_url_rule('/api/acc/deliveryMan', view_func=DeliveryManList.as_view("deliveryManList"))
app.add_url_rule('/api/acc/deliveryMan/<id>', view_func=DeliveryManInfo.as_view("deliveryManInfo"))
app.add_url_rule('/api/acc/deliveryMan/pw/<id>', view_func=UpdatePassword.as_view("UpdatePasswordDeliveryMan"))