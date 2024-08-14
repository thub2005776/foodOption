from flask import  request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import favorited_model
favorite_collection = db['favorites']


class FavoriteList(MethodView):
    def get(self):
        cursor = favorite_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any favorite details."

    def post(self):
        if request.json:
            query = {"uid": request.json.get("uid"), "fid": request.json.get("fid")}
            update = {
                "$set": favorited_model(request=request)
            }
            result = favorite_collection.find_one_and_update(
                query, 
                update=update, 
                upsert=True, 
                return_document=pymongo.ReturnDocument.AFTER
            )
            if result:
                return "successfull"
            else:
                return "Can't insert the favorite food. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = favorite_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all favorite food. Try again."
    
class Favorite(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = favorite_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The favorite food don't exist."
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
                        "$set": favorited_model(request=request)
                    }
                    result = favorite_collection.find_one_and_update(
                        query, 
                        update=update, 
                        upsert=True, 
                        return_document=pymongo.ReturnDocument.AFTER
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the favorite food. Try again."
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
                result = favorite_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the favorite food. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."
    
app.add_url_rule('/api/favorite', view_func=FavoriteList.as_view("FavoriteList"))
app.add_url_rule('/api/favorite/<id>', view_func=Favorite.as_view("Favorite"))