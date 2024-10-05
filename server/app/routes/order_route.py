from flask import request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import order_model
order_collection = db['order']


class OrderDetails(MethodView):
    def get(self):
        cursor = order_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any order details."

    def post(self):
        if request.json:
            document = order_model(request=request)
            result = order_collection.insert_one(document=document)
            if result:
                result_dict = {
                    "acknowledged": result.acknowledged,
                    "inserted_id": str(result.inserted_id)
                }
                return json.loads(json_util.dumps(result_dict))
            else:
                return "Can't insert the order detail. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = order_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all orderes. Try again."


class OrderDetail(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = order_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The order don't exist."
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
                        "$set": order_model(request=request)
                    }
                    result = order_collection.find_one_and_update(
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
                        return "Can't update the order detail. Try again."
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
                result = order_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the order Detail. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."


class OrderesByUid(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"userID": id}
                cursor = order_collection.find(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The order don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query1 = {"userID": id}
                result = order_collection.delete_many(query1)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the order. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."


class OrderesBySid(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"staffID": id}
                cursor = order_collection.find(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The order don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"staffID": id}
                result = order_collection.delete_many(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the order. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "Error."


class UpdatedOrder(MethodView):
    def post(self, id, index):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                if request.get_json:
                    quantity = request.json.get("quantity")
                    note = request.json.get("note")
                    update = {
                        "$set": {
                            "detail." +index +".quantity": quantity,
                            "detail." +index +".note": note
                        }
                    }
                    result = order_collection.find_one_and_update(
                        query,
                        update=update,
                        return_document=pymongo.ReturnDocument.AFTER
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the order detail. Try again."
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
                result = order_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the order Detail. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."


app.add_url_rule('/api/order', view_func=OrderDetails.as_view("OrderDetails"))
app.add_url_rule('/api/order/<id>',
                 view_func=OrderDetail.as_view("OrderDetail"))
app.add_url_rule('/api/order/uid/<id>',
                 view_func=OrderesByUid.as_view("orderesByUid"))
app.add_url_rule('/api/order/sid/<id>',
                 view_func=OrderesBySid.as_view("orderesBySid"))
app.add_url_rule('/api/order/<id>/<index>',
                 view_func=UpdatedOrder.as_view("updatedOrder"))
