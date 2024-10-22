from flask import  request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import notify_model
notify_collection = db['notify']


class Notifies(MethodView):
    def get(self):
        cursor = notify_collection.find().sort('updatedAt',pymongo.ASCENDING)
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any notify."

    def post(self):
        if request.json:
            document = notify_model(request=request)
            result = notify_collection.insert_one(document=document)
            if result:
                return "successfull"
            else:
                return "Can't insert the notify. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = notify_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all notify. Try again."
    
class Notify(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = notify_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else: 
                    return "The notify don't exist."
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
                        "$set": notify_model(request=request)
                    }
                    result = notify_collection.find_one_and_update(
                        query, 
                        update=update, 
                        upsert=True
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the notify. Try again."
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
                result = notify_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the notify. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."

class NotifiesByUid(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"order.userID": id}
                cursor = notify_collection.find(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The notifies don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."
        
    def post(self, id):
        try:
            if id:
                print(id)
                query = {"order.userID": id}
                if request.get_json:
                    update = {
                        "$set": notify_model(request=request)
                    }
                    result = notify_collection.find_one_and_update(
                        query, 
                        update=update, 
                        upsert=True
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the notify. Try again."
                else:
                    return "Body of the request is empty."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

 

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"order.userID": id}
                result = notify_collection.delete_many(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the notifies. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."


class NotifiesByCid(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"order._id": ObjectId(id)}
                cursor = notify_collection.find(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The notifies don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."
        
    def post(self, id):
        try:
            if id:
                print(id)
                query = {"order._id": ObjectId(id)}
                if request.get_json:
                    update = {
                        "$set": notify_model(request=request)
                    }
                    result = notify_collection.find_one_and_update(
                        query, 
                        update=update, 
                        upsert=True
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the notify. Try again."
                else:
                    return "Body of the request is empty."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

 
    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"order._id": ObjectId(id)}
                result = notify_collection.delete_many(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the notifies. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."
      
app.add_url_rule('/api/notify', view_func=Notifies.as_view("Notifies"))
app.add_url_rule('/api/notify/<id>', view_func=Notify.as_view("Notify"))
app.add_url_rule('/api/notify/uid/<id>', view_func=NotifiesByUid.as_view("NotifiesByUid"))
app.add_url_rule('/api/notify/cid/<id>', view_func=NotifiesByCid.as_view("NotifiesByCid"))