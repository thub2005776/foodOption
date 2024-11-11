from datetime import datetime
from flask import request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import review_model
review_collection = db['review']


class Reviews(MethodView):
    def get(self):
        cursor = review_collection.find().sort('updatedAt', pymongo.DESCENDING)
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any reviews."

    def post(self):
        if request.json:
            food = request.json.get("food")
            query = {
                "food._id.$oid": food['_id']['$oid'],
                "checkID": request.json.get("checkID"),
            }

            review_values = review_model(request=request)
            review_values['updatedAt'] = datetime.today()
            review_values['createdAt'] = datetime.today()
            updated = { "$set": review_values}
            
            result = review_collection.find_one_and_update(
                query,
                updated,
                upsert=True
            )
            if result:
                return "successfull"
            else:
                return "Can't insert the reviews. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = review_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all reviews. Try again."


class Review(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = review_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The review don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def post(self, id):
        try:
            if id and ObjectId(id):
                if request.get_json:
                    
                    query = {"_id": ObjectId(id) }
                    review_values = review_model(request=request)
                    review_values['updatedAt'] = datetime.today()
                    update = {"$set": review_values}
                    
                    result = review_collection.update_one(query, update=update)
                    if result.modified_count > 0:
                        return "successfull"
                    else:
                        return "None document is deleted."
                else:
                    return "Body of the request is empty."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                result = review_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the review. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."


class ReviewByUid(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"user._id.$oid": id}
                cursor = review_collection.find(query).sort('updatedAt', pymongo.DESCENDING)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The review don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."
        
    def post(self, id):
        try:
            if id and ObjectId(id):
                if request.get_json:
                    query = {"userID": id}
                    review_values = review_model(request=request)
                    review_values['updatedAt'] = datetime.today()
                    update_query = {"$set": review_values}
                    result = review_collection.update_many(query, update_query)

                    if result.modified_count > 0:
                        return "successfull"
                    else:
                        return "None document is updated."
                else:
                    return "Body of the request is empty."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."


    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"userID": id}
                result = review_collection.delete_many(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the reviews. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."


class ReviewByCid(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"checkID": id}
                cursor = review_collection.find(query).sort('updatedAt', pymongo.DESCENDING)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The review don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."
        
    def post(self, id):
        try:
            if id and ObjectId(id):
                if request.get_json:
                    query = {"checkID": id}
                    review_values = review_model(request=request)
                    review_values['updatedAt'] = datetime.today()
                    update_query = {"$set": review_values}
                    result = review_collection.update_many(query, update_query)

                    if result.modified_count > 0:
                        return "successfull"
                    else:
                        return "None document is updated."
                else:
                    return "Body of the request is empty."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."


    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"checkID": id}
                result = review_collection.delete_many(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the reviews. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."


class ReviewByFid(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"food._id.$oid": id}
                cursor = review_collection.find(query).sort('updatedAt', pymongo.DESCENDING)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The review don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."
        
    def post(self, id):
        try:
            if id and ObjectId(id):
                if request.get_json:
                    query = {"food._id.$oid": id}
                    review_values = review_model(request=request)
                    review_values['updatedAt'] = datetime.today()
                    update_query = {"$set": review_values}
                    result = review_collection.update_many(query, update_query)

                    if result.modified_count > 0:
                        return "successfull"
                    else:
                        return "None document is updated."
                else:
                    return "Body of the request is empty."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."


    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"food._id.$oid": id}
                result = review_collection.delete_many(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the reviews. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."





app.add_url_rule('/api/review', view_func=Reviews.as_view("Reviews"))
app.add_url_rule('/api/review/<id>',view_func=Review.as_view("Review"))
app.add_url_rule('/api/review/uid/<id>',view_func=ReviewByUid.as_view("ReviewByUid"))
app.add_url_rule('/api/review/cid/<id>',view_func=ReviewByCid.as_view("ReviewByCid"))
app.add_url_rule('/api/review/fid/<id>',view_func=ReviewByFid.as_view("ReviewByFid"))