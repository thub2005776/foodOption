from flask import  request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import food_type_model
from app.routes.food_route import FoodManyByGid
food_collection = db['foodType']


class Food_type(MethodView):
    def get(self):
        cursor = food_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any food type."

    def post(self):
        if request.json:
            updated = request.json.get("updated")
            
            if updated:
                query = {"_id": ObjectId(updated)}
                update = {"$set": food_type_model(request=request)}
                result = food_collection.find_one_and_update(
                    query, 
                    update=update, 
                    upsert=True
                )
            else:
                document = food_type_model(request=request)
                result = food_collection.insert_one(document)
            

            if result:
                return 'successfull'
            else:
                return "Can't insert the food type. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = food_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all food type. Try again."
    
class Food_type_item(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = food_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The food type don't exist."
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
                        "$set": food_type_model(request=request)
                    }
                    result = food_collection.find_one_and_update(
                        query, 
                        update=update, 
                        upsert=True
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the food type. Try again."
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
                    return "Can't delete the food type. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."
    

class Food_type_many(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"foodID": id}
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
                query = {"foodID": id}
                result = food_collection.delete_many(query)

                if result:
                    return "successfull"
                else:
                    return "Can't delete the food type. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "Error."
    
app.add_url_rule('/api/foodtype', view_func=Food_type.as_view("food_type"))
app.add_url_rule('/api/foodtype/<id>', view_func=Food_type_item.as_view("food_type_item"))
app.add_url_rule('/api/foodtype/fid/<id>', view_func=Food_type_many.as_view("food_type_many"))