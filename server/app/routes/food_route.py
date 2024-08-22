from flask import  request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import food_model
from app.routes.recipe_route import Recipe
food_collection = db['foodDetails']


class FoodDetails(MethodView):
    def get(self):
        cursor = food_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any food details."

    def post(self):
        if request.json:
            query = {"name": request.json.get("name")}
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
                return 'successfull'
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
        except:
            return "ID (ObjectId) pamram is required."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}

                result1 = food_collection.delete_one(query)
                result2 = Recipe.delete(id=id)
                if result1 and result2:
                    return "successfull"
                else:
                    return "Can't delete the foodDetail. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."
        
class FoodMany(MethodView):
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
                query1 = {"topicID": id}
                result = food_collection.delete_many(query1)
                if result:
                    for i in result:
                        print(i)
                    return "successfull"
                else:
                    return "Can't delete the foodGroupItem. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."
    
app.add_url_rule('/api/food', view_func=FoodDetails.as_view("foodDetails"))
app.add_url_rule('/api/food/<id>', view_func=FoodDetail.as_view("foodDetail"))
app.add_url_rule('/api/food/tid/<id>', view_func=FoodMany.as_view("foodMany"))