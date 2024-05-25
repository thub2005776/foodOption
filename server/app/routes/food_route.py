from flask import  request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import food_model
food_collection = db['foodDetails']


class FoodDetails(MethodView):
    def get(self):
        cursor = food_collection.find()
        return json.loads(json_util.dumps(cursor))

    def post(self):
        if request.json:
            query = {"code": request.json.get("code")}
            update = {
                "$set": food_model(request=request)
            }
            result = food_collection.find_one_and_update(
                query, 
                update=update, 
                upsert=True, 
                return_document=pymongo.ReturnDocument.AFTER
            )
            if result:
                return "successfull"
            else:
                return "Can't insert the food detail. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = food_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all foodDetail. Try again."
    
class FoodDetail(MethodView):
    def get(self, id):
        if id:
            query = {"_id": ObjectId(id)}
            cursor = food_collection.find_one(query)
            return json.loads(json_util.dumps(cursor))
        else:
            return "ID pamram is empty."
    def post(self, id):
        if id:
            print(id)
            query = {"_id": ObjectId(id)}
            if request.get_json:
                update = {
                    "$set": food_model(request=request)
                }
                result = food_collection.find_one_and_update(
                    query, 
                    update=update, 
                    upsert=True, 
                    return_document=pymongo.ReturnDocument.AFTER
                )
                if result:
                    return "successfull"
                else:
                    return "Can't update the foodDetail. Try again."
            else:
                return "Body of the request is empty."
        else:
            return "ID pamram is empty."

    def delete(self, id):
        if id:
            query = {"_id": ObjectId(id)}
            result = food_collection.delete_one(query)
            if result:
                return "successfull"
            else:
                return "Can't delete the foodDetail. Try again."
        else:
            return "This is a DELETE request."
    
app.add_url_rule('/api/food', view_func=FoodDetails.as_view("foodDetails"))
app.add_url_rule('/api/food/<id>', view_func=FoodDetail.as_view("foodDetail"))