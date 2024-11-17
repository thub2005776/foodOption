from flask import  request
from flask.views import MethodView
from app import app
import pymongo
import json
from bson import json_util, ObjectId
from app.db_connection import db
from app.models import topic_model
from datetime import  datetime

topic_collection = db['topics']
food_collection = db['foodDetails']

class Topics(MethodView):
    def get(self):
        cursor = topic_collection.find()
        if cursor:
            return json.loads(json_util.dumps(cursor))
        else:
            return "Not found any topic group."

    def post(self):
        if request.json:
            query = {"name": request.json.get("name")}
            update = {
                "$set": topic_model(request=request)
            }
            result = topic_collection.find_one_and_update(
                query, 
                update=update, 
                upsert=True, 
                return_document=pymongo.ReturnDocument.AFTER
            )

            if result:
                return json.loads(json_util.dumps(result['_id']))
            else:
                return "Can't insert the topic group. Try again."
        else:
            return "Body of the request is empty."

    def delete(self):
        result1 = topic_collection.delete_many({})
        # result2 = FoodGroup.delete()
        # result3 = FoodDetails.delete()
        if result1 :
            return "successfull"
        else:
            return "Can't delete all topic. Try again."
    
class Topic(MethodView):
    def get(self, id):
        try:
            if id and ObjectId(id):
                query = {"_id": ObjectId(id)}
                cursor = topic_collection.find_one(query)
                if cursor:
                    return json.loads(json_util.dumps(cursor))
                else:
                    return "The topic don't exist."
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
                        "$set": topic_model(request=request)
                    }
                    result = topic_collection.find_one_and_update(
                        query, 
                        update=update, 
                        upsert=True, 
                        return_document=pymongo.ReturnDocument.AFTER
                    )
                    if result:
                        return "successfull"
                    else:
                        return "Can't update the topic. Try again."
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
                result1 = topic_collection.delete_one(query)
                
                if result1:
                    return "successfull"
                else:
                    return "Can't delete the topic. Try again."
               
            else:
                return "This is a DELETE request."
        except:
            return "Error."


class Top_topics(MethodView):
    def get(self):
        topics = topic_collection.find()
        if topics:
            arr = []
            for topic in topics:
                id = topic['_id']
                food = food_collection.find({"topicID": str(id)})
                if food:
                    sum = 0
                    for i in food:
                        sum += i['sold']
                        
                    arr.append({"topic": topic, "sum": sum})
            
            return json.loads(json_util.dumps(arr))
        else:
            return "Not found any topic group."

    def post(self):
        if request.json:
            query = {"topicID": request.json.get("topicID")}
            food = food_collection.find(query)

            if food:
                arr = []
                date = datetime.strftime(datetime.today(), "%d/%m/%Y")
                

                for i in food:
                    default_values = {
                        "start": date, 
                        "end": date, 
                        "profit": 0, 
                        "perprofit": 0,
                        "order_total": 0,
                        "impt_total": 0,
                        "sum": 0
                    }
                    default_values['order_total'] += i['sold'] * i['price']
                    default_values['mpt'] += i['sold'] * i['cost']
                    default_values['sum'] = i['sold']

                    arr.append(default_values)

                return json.loads(json_util.dumps(arr))
            else:
                return "Can't insert the topic group. Try again."
        else:
            return "Body of the request is empty."

    
class Top_topic(MethodView):
    def get(self, id):
        query = {"topicID": id}
        food = food_collection.find(query)

        if food:
            date = datetime.strftime(datetime.today(), "%d/%m/%Y")
            default_values = {
                    "start": date, 
                    "end": date, 
                    "profit": 0, 
                    "perprofit": 0,
                    "order_total": 0,
                    "impt_total": 0,
                    "sold": 0,
                    "sum": 0,
                }
            index = 0
            for i in food:
                index += 1
                
                default_values['order_total'] += int(i['sold']) * int(i['price'])
                default_values['impt_total'] += int(i['sold']) * int(i['cost'])
                default_values['sold'] += int(i['sold'])
            default_values['sum'] = index
            default_values['profit'] = float(default_values['order_total']) - float( default_values['impt_total'])
            if default_values['profit'] == 0 or default_values['order_total'] == 0:
                default_values['perprofit'] = 0
            else:
                default_values['perprofit'] = float(default_values['profit'])/float(default_values['order_total']) * 100

            return json.loads(json_util.dumps(default_values))
        else:
            return "Can't find the topic group. Try again."

  
app.add_url_rule('/api/topic', view_func=Topics.as_view("topics"))
app.add_url_rule('/api/topic/<id>', view_func=Topic.as_view("topic"))
app.add_url_rule('/api/topic/sum', view_func=Top_topics.as_view("topics_sum"))
app.add_url_rule('/api/topic/sum/<id>', view_func=Top_topic.as_view("topic_sum"))