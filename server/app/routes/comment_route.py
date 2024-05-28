from flask import  request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import comment_model
comment_collection = db['comments']


class CommentList(MethodView):
    def get(self):
        cursor = comment_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any comment details."

    def post(self):
        if request.json:
            query = {"uid": request.json.get("uid"), "fid": request.json.get("fid")}
            update = {
                "$set": comment_model(request=request)
            }
            result = comment_collection.find_one_and_update(
                query, 
                update=update, 
                upsert=True, 
                return_document=pymongo.ReturnDocument.AFTER
            )
            if result:
                return "successfull"
            else:
                return "Can't insert the comment. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = comment_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all comment. Try again."
    
class Comment(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = comment_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The comment don't exist."
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
                        "$set": comment_model(request=request)
                    }
                    result = comment_collection.find_one_and_update(
                        query, 
                        update=update, 
                        upsert=True, 
                        return_document=pymongo.ReturnDocument.AFTER
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the comment. Try again."
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
                result = comment_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the comment. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."
    
app.add_url_rule('/api/comment', view_func=CommentList.as_view("CommentList"))
app.add_url_rule('/api/comment/<id>', view_func=Comment.as_view("Comment"))