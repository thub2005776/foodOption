from flask import  request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import import_coupon_model
from datetime import datetime
food_collection = db['importCoupon']


class Import_coupon(MethodView):
    def get(self):
        cursor = food_collection.find().sort("updatedAt", pymongo.DESCENDING)
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any import coupon."

    def post(self):
        if request.json:
            updated = request.json.get("id")
            document = import_coupon_model(request=request)
            document['updatedAt'] = datetime.today()
            if updated:
                query = {"_id": ObjectId(updated)}
                
                update = {
                    "$set": document
                }
                result = food_collection.find_one_and_update(
                    query, 
                    update=update, 
                )
            else:
                document = import_coupon_model(request=request)
                document['createdAt'] = datetime.today()
                result = food_collection.insert_one(document)
            if result:
                return 'successfull'
            else:
                return "Can't insert the import coupon. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result = food_collection.delete_many({})
        if result:
            return "successfull"
        else:
            return "Can't delete all import coupon. Try again."
    
class Import_couppon_by_id(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = food_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The import coupon don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."
        
    def post(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                if request.get_json:
                    update = { "$set": import_coupon_model(request=request)}
                    result = food_collection.find_one_and_update(
                        query, 
                        update=update, 
                        upsert=True
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the import coupon. Try again."
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
                    return "Can't delete the import coupon. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."

class Import_coupon_by_food_type_id(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"detail.foodTypeID": id}
                cursor = food_collection.find(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The import coupon don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query1 = {"detail.foodTypeID": id}
                result = food_collection.delete_many(query1)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the import coupon. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."
     
    
class Import_couppon_by__supplier_id(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"supplier._id": ObjectId(id)}
                cursor = food_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The import coupon don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."
        
    def post(self, id):
        try:
            if id and ObjectId(id):
                query = {"supplier._id": ObjectId(id)}
                if request.get_json:
                    update = { "$set": import_coupon_model(request=request)}
                    result = food_collection.find_one_and_update(
                        query, 
                        update=update, 
                        upsert=True
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the import coupon. Try again."
                else:
                    return "Body of the request is empty."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"supplier._id": ObjectId(id)}
                result = food_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the import coupon. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."


class Import_couppon_by__staff_id(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"staff._id": ObjectId(id)}
                cursor = food_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The import coupon don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."
        
    def post(self, id):
        try:
            if id and ObjectId(id):
                query = {"staff._id": ObjectId(id)}
                if request.get_json:
                    update = { "$set": import_coupon_model(request=request)}
                    result = food_collection.find_one_and_update(
                        query, 
                        update=update, 
                        upsert=True
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the import coupon. Try again."
                else:
                    return "Body of the request is empty."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"staff._id": ObjectId(id)}
                result = food_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the import coupon. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."


class Import_couppon_backup(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"editedID": id}
                cursor = food_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The import coupon don't exist."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."
        
    def post(self, id):
        try:
            if id and ObjectId(id):
                query = {"editedID": ObjectId(id)}
                document = import_coupon_model(request=request)
                document['updatedAt'] = datetime.today()
                if request.get_json:
                    update = { "$set": document}
                    result = food_collection.find_one_and_update(
                        query, 
                        update=update
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the import coupon. Try again."
                else:
                    return "Body of the request is empty."
            else:
                return "ID pamram is empty."
        except:
            return "ID (ObjectId) pamram is required."

    def delete(self, id):
        try:
            if id and ObjectId(id):
                query = {"editedID": id}
                result = food_collection.delete_one(query)
                if result:
                    return "successfull"
                else:
                    return "Can't delete the import coupon. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."

app.add_url_rule('/api/importcoupon', view_func=Import_coupon.as_view("Import_coupon"))
app.add_url_rule('/api/importcoupon/<id>', view_func=Import_couppon_by_id.as_view("ImportCouponByID"))
app.add_url_rule('/api/importcoupon/foodtype/<id>', view_func=Import_coupon_by_food_type_id.as_view("importCouponByFoodTypeID"))
app.add_url_rule('/api/importcoupon/supplier/<id>', view_func=Import_couppon_by_id.as_view("ImportCouponBySupplierID"))
app.add_url_rule('/api/importcoupon/staff/<id>', view_func=Import_couppon_by_id.as_view("ImportCouponByStaffID"))

app.add_url_rule('/api/importcoupon/backup/<id>', view_func=Import_couppon_backup.as_view("ImportCouponBackup"))