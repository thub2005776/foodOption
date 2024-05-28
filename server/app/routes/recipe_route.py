from flask import  request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import recipe_model
recipe_collection = db['recipes']


class recipeList(MethodView):
    def get(self):
        cursor = recipe_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any recipe."

    def post(self):
        if request.json:
            query = {"name": request.json.get("name")}
            update = {
                "$set": recipe_model(request=request)
            }
            result = recipe_collection.find_one_and_update(
                query, 
                update=update, 
                upsert=True, 
                return_document=pymongo.ReturnDocument.AFTER
            )
            if result:
                return "successfull"
            else:
                return "Can't insert the recipe detail. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = recipe_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all recipeDetail. Try again."
    
class recipeDetail(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = recipe_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else: 
                    return "The recipe don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."
        
    def post(self, id):
        try:
            if id:
                print(id)
                query = {"_id": ObjectId(id)}
                if request.get_json:
                    update = {
                        "$set": recipe_model(request=request)
                    }
                    result = recipe_collection.find_one_and_update(
                        query, 
                        update=update, 
                        upsert=True, 
                        return_document=pymongo.ReturnDocument.AFTER
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the recipe. Try again."
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
                result = recipe_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the recipe. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."
    
app.add_url_rule('/api/recipe', view_func=recipeList.as_view("recipeList"))
app.add_url_rule('/api/recipe/<id>', view_func=recipeDetail.as_view("recipeDetail"))