from flask import  request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import foodGroup_model
from app.routes.food_route import FoodManyByGid
food_collection = db['foodGroup']


class FoodGroup(MethodView):
    def get(self):
        cursor = food_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any food group."

    def post(self):
        if request.json:
            query = {"name": request.json.get("name")}
            update = {
                "$set": foodGroup_model(request=request)
            }
            result = food_collection.find_one_and_update(
                query, 
                update=update, 
                upsert=True, 
                return_document=pymongo.ReturnDocument.AFTER
            )

            if result:
                print(result)
                return 'successfull'
            else:
                return "Can't insert the food group. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = food_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all foodGroupItem. Try again."
    
class FoodGroupItem(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = food_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The food don't exist."
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
                        "$set": foodGroup_model(request=request)
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
                        return "Can't update the food group. Try again."
                else:
                    return "Body of the request is empty."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                result1 = food_collection.delete_one(query)
                result2 = FoodManyByGid.delete(id)
                if result1:
                    return result2
                else:
                    return "Can't delete the foodGroupItem. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."
    

class FoodGroupMany(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"topicID": id}
                cursor = food_collection.find(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The food don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"topicID": id}
                result = food_collection.delete_many(query)

                if result:
                    return "successfull"
                else:
                    return "Can't delete the foodGroupItem. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "Error."
    
app.add_url_rule('/api/foodgroup', view_func=FoodGroup.as_view("foodGroup"))
app.add_url_rule('/api/foodgroup/<id>', view_func=FoodGroupItem.as_view("foodGroupItem"))
app.add_url_rule('/api/foodgroup/tid/<id>', view_func=FoodGroupMany.as_view("foodGroupMany"))