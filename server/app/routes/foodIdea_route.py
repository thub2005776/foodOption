from flask import  request
from flask.views import MethodView
from app import app
import pymongo
import json
import numpy as np
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import food_model
from app.model.load_model import load_model

# {
#     "age": 3,
#     "outlook": 0,
#     "themp": 3.50,
#     "located": 2,
#     "pathological": 0,
#     "type": 1,
#     "vegetarian": 0
# }

food_collection = db['foodDetails']
model = load_model()

class SetFood(MethodView):
    def get(self):
        cursor = food_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any food details."

    def post(self):
        if request.json:
            data = request.json
            features = np.array(list(data.values())).reshape(-1, 7)
            predictions = model.predict(features)
            print(predictions[0])
            
            query = {"gid": predictions[0]}
            cursor = food_collection.find(query)
            if cursor:
                return json.loads(json_util.dumps(cursor))
            else:
                return "Not found any food details."
        else:
            return "Body of the request is empty."
    
class FoodDetail(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = food_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The food don't exist."
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
                        "$set": food_model(request=request)
                    }
                    result = food_collection.find_one_and_update(
                        query, 
                        update=update, 
                        upsert=True, 
                        return_document=pymongo.ReturnDocument.AFTER
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the foodDetail. Try again."
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
                    return "Can't delete the foodDetail. Try again."
            else:
                return "This is a DELETE request."
        except:
            return "ID (ObjectId) pamram is required."
    
app.add_url_rule('/api/foodidea', view_func=SetFood.as_view("setFood"))
# app.add_url_rule('/api/food/<id>', view_func=FoodDetail.as_view("foodDetail"))