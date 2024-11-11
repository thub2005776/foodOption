from datetime import datetime
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
        cursor = food_collection.find().sort('sold', pymongo.DESCENDING)
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any food details."

    def post(self):
        if request.json:
            query = {"name": request.json.get("name")}
            food_values = food_model(request=request)
            food_values["createdAt"] = datetime.today()
            food_values["updatedAt"] = datetime.today()
            update = {
                "$set": food_values
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
                query = {"_id": ObjectId(id)}
                if request.get_json:
                    favorited = request.json.get("favorited")
                    operation = request.json.get("operation")
                    food_values = food_model(request=request)
                    food_values['updatedAt'] = datetime.today()
                    if favorited:
                        favoritedFood = food_collection.find_one(query)
                        if operation == '+':
                            update = {"$set": {"favorited": favoritedFood['favorited'] + favorited }}
                        else:
                            update = {"$set": {"favorited": favoritedFood['favorited'] - favorited }}
                    else:
                        update = { "$set": food_values}
                    
                    
                    result = food_collection.find_one_and_update(
                        query, 
                        update=update, 
                        upsert=True
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
                result = food_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the foodDetail. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."

class Food(MethodView):
    def post(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                if request.get_json:
                    food = food_collection.find_one(query)
                    quantity = request.json.get("quantity")
                    operation = request.json.get("operation")
                    if food:
                        stored = food['stored']
                        if (operation == '+'):
                            update = {"$set": {"stored": stored + quantity}}
                        else:
                            update = {"$set": {"stored": stored - quantity}}
                        
                        result = food_collection.find_one_and_update(
                            query, 
                            update=update, 
                            upsert=True
                        )
                        if result:
                            return "successfull"
                        else:
                            return "Can't update the foodDetail. Try again."
                    else :
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
                result = food_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the foodDetail. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."

class FoodManyByGid(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"groupID": id}
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
                query1 = {"groupID": id}
                result = food_collection.delete_many(query1)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the foodGroupItem. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."

class FoodManyByTid(MethodView):
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
        
    
app.add_url_rule('/api/food', view_func=FoodDetails.as_view("foodDetails"))
app.add_url_rule('/api/food/<id>', view_func=FoodDetail.as_view("foodDetail"))
app.add_url_rule('/api/food/stored/<id>', view_func=Food.as_view("foodStored"))
app.add_url_rule('/api/food/gid/<id>', view_func=FoodManyByGid.as_view("foodManyByGid"))
app.add_url_rule('/api/food/tid/<id>', view_func=FoodManyByTid.as_view("foodManyByTid"))