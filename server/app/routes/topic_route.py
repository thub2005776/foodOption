from flask import  request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import topic_model
from app.routes.food_route import FoodManyByTid
from app.routes.foodGroup_route import FoodGroupMany

topic_collection = db['topics']

class Topics(MethodView):
    def get(self):
        cursor = topic_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any topic group."

    def post(self):
        if request.json:
            query = {"name": request.json.get("name")}
            update = {
                "$set": topic_model(request=request)
            }
            result = topic_collection.find_one_and_update(
                query, 
                update=update, 
                upsert=True, 
                return_document=pymongo.ReturnDocument.AFTER
            )

            if result:
                return json.loads(json_util.dumps(result['_id']))
            else:
                return "Can't insert the topic group. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result1 = topic_collection.delete_many({})
        # result2 = FoodGroup.delete()
        # result3 = FoodDetails.delete()
        if result1 :
            return "successfull"
        else:
            return "Can't delete all topic. Try again."
    
class Topic(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = topic_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The topic don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."
        
    def post(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                if request.get_json:
                    update = {
                        "$set": topic_model(request=request)
                    }
                    result = topic_collection.find_one_and_update(
                        query, 
                        update=update, 
                        upsert=True, 
                        return_document=pymongo.ReturnDocument.AFTER
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the topic. Try again."
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
                result1 = topic_collection.delete_one(query)
                # result2 = await FoodManyByTid.delete(id=id)
                # result3 = await FoodGroupMany.delete(id=id)
                if result1:
                    return "successfull"
                else:
                    return "Can't delete the topic. Try again."
               
            else:
                return "This is a DELETE request."
        except:
            return "Error."
    
app.add_url_rule('/api/topic', view_func=Topics.as_view("topics"))
app.add_url_rule('/api/topic/<id>', view_func=Topic.as_view("topic"))