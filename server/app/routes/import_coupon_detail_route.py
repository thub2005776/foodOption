from flask import  request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import import_coupon_detail_model
food_collection = db['importCouponDetail']


class Import_coupon_detail(MethodView):
    def get(self):
        cursor = food_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any details."

    def post(self):
        if request.json:
            query = {"_id": request.json.get("_id")}
            update = {
                "$set": import_coupon_detail_model(request=request)
            }
            result = food_collection.find_one_and_update(
                query, 
                update=update, 
                upsert=True,
            )
            if result:
                return 'successfull'
            else:
                return "Can't insert the detail. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = food_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all Detail. Try again."
    
class Import_couppon_detail_by_id(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = food_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The detail don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."
        
    def post(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                if request.get_json:
                    update = { "$set": import_coupon_detail_model(request=request)}
                    result = food_collection.find_one_and_update(
                        query, 
                        update=update, 
                        upsert=True
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the detail. Try again."
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
                    return "Can't delete the detail. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."

class Import_coupon_detail_by_food_type_id(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"foodTypeID": id}
                cursor = food_collection.find(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The detail don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query1 = {"foodTypeID": id}
                result = food_collection.delete_many(query1)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the detail. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."

class Import_coupon_detail_by_Imp_id(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"importCouponID": id}
                cursor = food_collection.find(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The details don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"importCouponID": id}
                result = food_collection.delete_many(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the detail. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "Error."
        
    
app.add_url_rule('/api/importcoupon/detail', view_func=Import_coupon_detail.as_view("ImportCouponDetail"))
app.add_url_rule('/api/importcoupon/detail/<id>', view_func=Import_couppon_detail_by_id.as_view("ImportCouponDetailByID"))
app.add_url_rule('/api/importcoupon/detail/foodtype/<id>', view_func=Import_coupon_detail_by_food_type_id.as_view("importCouponDetailByFoodyTpeID"))
app.add_url_rule('/api/importcoupon/detail/imp/<id>', view_func=Import_coupon_detail_by_Imp_id.as_view("ImportCouponDetailByImpID"))