from flask import request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import favorited_model
favorited_collection = db['favorited']


class FavoritedDetails(MethodView):
    def get(self):
        cursor = favorited_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any favorited details."

    def post(self):
        if request.json:
            food = request.json.get('food')
            query = {"userID": request.json.get('userID'),
                     "food._id.$oid": food['_id']['$oid'],
                    }
            updated = {"$set": favorited_model(request=request)}
            result = favorited_collection.find_one_and_update(
                query,
                updated,
                upsert=True,
            )
            if result:
                print(result)
                
                return json.loads(json_util.dumps(result['_id']))
            else:
                return "Can't insert the favorited detail. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = favorited_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all orderes. Try again."


class FavoritedDetail(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = favorited_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The favorited don't exist."
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
                        "$set": favorited_model(request=request)
                    }
                    result = favorited_collection.find_one_and_update(
                        query,
                        update=update,
                        upsert=True,
                        return_document=pymongo.ReturnDocument.AFTER
                    )
                    if result:
                        result_dict = {
                            "acknowledged": result.acknowledged,
                            "inserted_id": str(result.inserted_id)
                        }
                        return json.loads(json_util.dumps(result_dict))
                    else:
                        return "Can't update the favorited detail. Try again."
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
                result = favorited_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the favorited Detail. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."


class FavoritedByUid(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"userID": id}
                cursor = favorited_collection.find(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The favorited don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query1 = {"userID": id}
                result = favorited_collection.delete_many(query1)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the favorited. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."


class FavoritedByFid(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"food._id.$oid": id}
                cursor = favorited_collection.find(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The favorited don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"food._id.$oid": id}
                result = favorited_collection.delete_many(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the favorited. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "Error."


app.add_url_rule('/api/favorited', view_func=FavoritedDetails.as_view("FavoritedDetails"))
app.add_url_rule('/api/favorited/<id>', view_func=FavoritedDetail.as_view("FavoritedDetail"))
app.add_url_rule('/api/favorited/uid/<id>', view_func=FavoritedByUid.as_view("FavoritedByUid"))
app.add_url_rule('/api/favorited/fid/<id>', view_func=FavoritedByFid.as_view("FavoritedByFid"))