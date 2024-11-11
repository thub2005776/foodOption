from datetime import datetime
from flask import request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import cart_model
cart_collection = db['cart']


class CartDetails(MethodView):
    def get(self):
        cursor = cart_collection.find().sort('updatedAt', pymongo.DESCENDING)
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any cart details."

    def post(self):
        if request.json:
            document = cart_model(request=request)
            document['createdAt'] = datetime.today()
            document['updatedAt'] = datetime.today()
            result = cart_collection.insert_one(document)
            if result:
                return "successfull"
            else:
                return "Can't insert the cart detail. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = cart_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all cart. Try again."


class CartDetail(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = cart_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The cart don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def post(self, id):
        try:
            if id and ObjectId(id):
                if request.get_json:
                    userID = id
                    foodID =  request.json.get("foodID")
                    remover_element = request.json.get("element")
                    query = {
                            "userID": userID,
                            "detail.food._id.$oid": foodID
                    }

                    update_query = {
                        "$set": {"updatedAt": datetime.today()},
                        "$pull": {"detail": remover_element}
                        }

                    result = cart_collection.update_one(query, update_query)
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
                result = cart_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the cart Detail. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."


class CartByUid(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"userID": id}
                cursor = cart_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The cart don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."
        
    def post(self, id):
        try:
            if id and ObjectId(id):
                if request.get_json:
                    userID = id
                    foodID =  request.json.get("foodID")
                    quantity = request.json.get("quantity")
                    note = request.json.get("note")

                    query = {
                        "userID": userID,
                        "detail.food._id.$oid": foodID
                    }

                    update_query = {"$set": {"detail.$.quantity": quantity, "detail.$.note": note}}
                    result = cart_collection.update_one(query, update_query)

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
                query1 = {"userID": id}
                result = cart_collection.delete_many(query1)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the cart. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."



class Updatedcart(MethodView):
    def post(self):
        try:
            if request.get_json:
                userID = request.json.get("userID")
                foodID =  request.json.get("foodID")
                
                query = {
                    "userID": userID,
                    "detail.food._id.$oid": foodID
                }

                doc =   cart_collection.find_one(query)
                if doc:
                    for item in doc['detail']:
                        if item['food']['_id']['$oid'] == foodID:
                            new_quantity = item['quantity'] + 1
                            update_query = {"$set": {"detail.$.quantity": new_quantity}}
                            result = cart_collection.update_one(query, update_query)

                            if result.modified_count > 0:
                                return "successfull"
                            else:
                                return "Không có tài liệu nào được cập nhật."
                            break
                else:
                    query_new = {
                    "userID": userID
                    }
                    new_element =  request.json.get("element")
                    update = {
                        '$set': cart_model(request=request),
                        '$push': {'detail': new_element}, 
                    }
                    result = cart_collection.update_one(query_new, update)

                    if result.modified_count > 0:
                        return "successfull"
                    else:
                        return "Không có tài liệu nào được cập nhật."
            else:
                return "Body of the request is empty."
        except:
            return "ID (ObjectId) pamram is required."



app.add_url_rule('/api/cart', view_func=CartDetails.as_view("cartDetails"))
app.add_url_rule('/api/cart/<id>',view_func=CartDetail.as_view("cartDetail"))
app.add_url_rule('/api/cart/uid/<id>',view_func=CartByUid.as_view("cartByUid"))
app.add_url_rule('/api/cart/food',view_func=Updatedcart.as_view("updatedcart"))