from app.models import user_model, address_model
from flask import request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
address_collection = db['address']

class UserAddresses(MethodView):
    def get(self):
        cursor = address_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any address."

    def post(self):
        if request.json:
            values = address_model(request=request)
            query = {"address": values['address']}
            update = {
                "$set": values
            }

            result = address_collection.find_one_and_update(
                query,
                update=update,
                upsert=True,
                return_document=pymongo.ReturnDocument.AFTER
            )
            if result:
                return "successfull"
            else:
                return "Can't insert the address. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = address_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all addresses. Try again."

       
class UserAddress(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = address_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The address don't exist."
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
                        "$set": address_model(request=request)
                    }
                    result = address_collection.find_one_and_update(
                        query,
                        update=update,
                        upsert=True
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the address. Try again."
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
                result = address_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the address. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."



class UserAddressByUid(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"userID": id}
                cursor = address_collection.find(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The address don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def post(self, id):
        try:
            if id and ObjectId(id):
                print(id)
                query = {"userID": id}
                
                if request.get_json:
                    update = {
                        "$set": address_model(request=request)
                    }

                    result = address_collection.update_many(
                        query,
                        update=update,
                    )

                    print(result)
                    if result:
                        return "successfull"
                    else:
                        return "not"
                else:
                    return "Body of the request is empty."
            else:
                return "ID (ObjectId) pamram is required."
        except:
            return "Error"

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"userID": ObjectId(id)}
                result = address_collection.delete_many(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the address. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."


app.add_url_rule('/api/acc/user/address', view_func=UserAddresses.as_view("UserAddresses"))
app.add_url_rule('/api/acc/user/address/<id>', view_func=UserAddress.as_view("UserAddress"))
app.add_url_rule('/api/acc/user/address/uid/<id>', view_func=UserAddressByUid.as_view("UserAddressByUid"))