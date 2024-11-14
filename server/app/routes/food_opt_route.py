from flask import  request
from flask.views import MethodView
from app import app
import pymongo
import json
import numpy as np
import pandas as pd
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import food_model
from app.model.load_model import load_model
 

food_collection = db['foodDetails']
model = load_model()

class SetFood(MethodView):
    def post(self):
        if request.json:
            data = request.json
            features = np.array(list(data.values())).reshape(-1, 4)
            predictions = model.predict(features)

            query = {"groupID": predictions[0]}
            cursor = food_collection.find(query)
            if cursor:
                return json.loads(json_util.dumps(cursor))
            else:
                return "Not found any food details."
        else:
            return "Body of the request is empty."
    
app.add_url_rule('/api/foodopt', view_func=SetFood.as_view("setFood"))