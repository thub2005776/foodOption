from flask import request
from flask.views import MethodView
from app import app
import json
from bson import json_util
from app.db_connection import db
from datetime import datetime, timedelta
order_collection = db['order']
import_collection = db['importCoupon']

def statics_func(order_list, impt_list, start, end):
    order_total = 0
    impt_total = 0
    
    for i in order_list:
        order_total += i['total']

    for i in impt_list:
        impt_total += i['total']

    profit = order_total - impt_total
    if profit == 0 or order_total == 0:
        perprofit = 0
    else: 
        perprofit = round(float(profit)/float(order_total) * 100, 2)

    date = datetime.strftime(start, "%d/%m/%Y") + '-' + datetime.strftime(end, "%d/%m/%Y")
    values = {
        "start": date, 
        "end": datetime.strftime(end, "%d/%m/%Y"), 
        "profit": profit, 
        "perprofit": perprofit,
        "order_total": order_total,
        "impt_total": impt_total
    }

    return values


def food_statics_func(order_list, start, end):
    order_total = 0
    impt_total = 0
    
    for i in order_list:
        detail = i['detail']
        for j in detail:
            order_total += int( j['food']['price']) * j['quantity']
            impt_total += int( j['food']['cost']) * j['quantity']
    
    profit = order_total - impt_total
    if profit == 0 or order_total == 0:
        perprofit = 0
    else: 
        perprofit = float(profit)/float(order_total) * 100

    date = datetime.strftime(start, "%d/%m/%Y") + '-' + datetime.strftime(end, "%d/%m/%Y")
    values = {
        "start": date, 
        "end": datetime.strftime(end, "%d/%m/%Y"), 
        "profit": profit, 
        "perprofit": perprofit,
        "order_total": order_total,
        "impt_total": impt_total
    }

    return values


def topic_statics_func(order_list, start, end):
    order_total = 0
    impt_total = 0
    
    for i in order_list:
        detail = i['detail']
        for j in detail:
            order_total += int( j['food']['price']) * j['quantity']
            impt_total += int( j['food']['cost']) * j['quantity']
    
    profit = order_total - impt_total
    if profit == 0 or order_total == 0:
        perprofit = 0
    else: 
        perprofit = float(profit)/float(order_total) * 100

    date = datetime.strftime(start, "%d/%m/%Y") + '-' + datetime.strftime(end, "%d/%m/%Y")
    values = {
        "start": date, 
        "end": datetime.strftime(end, "%d/%m/%Y"), 
        "profit": profit, 
        "perprofit": perprofit,
        "order_total": order_total,
        "impt_total": impt_total
    }

    return values

class Profit_in_day(MethodView):
    def get(self, time):
        if time == 'day':
            days = 1
        if time == 'week':
            days = 7
        if time == 'month':
            days = 30
        if time == 'year':
            days = 365

        start_date = datetime.today() - timedelta(days=days)
        end_date = datetime.today()
        cursor_order = order_collection.find({"createdAt": {"$gte": start_date, "$lt": end_date}})
        cursor_impt = import_collection.find({"createdAt": {"$gte": start_date, "$lt": end_date}})
        if cursor_order and cursor_impt:
            values = statics_func(cursor_order, cursor_impt, start_date, end_date)
            return json.loads(json_util.dumps([values]))
        else:
            return "Not found any profit."


class Profit_option(MethodView):
    def post(self):
        if request.json:
            start = request.json.get('start')
            start_date = datetime.strptime(start[0:10], "%Y-%m-%d")
            end = request.json.get('end')
            end_date = datetime.strptime(end[0:10], "%Y-%m-%d")

        cursor_order = order_collection.find({"createdAt": {"$gte": start_date, "$lt": end_date}})
        cursor_impt = import_collection.find({"createdAt": {"$gte": start_date, "$lt": end_date}})
        if cursor_order and cursor_impt:
            values = statics_func(cursor_order, cursor_impt, start_date, end_date)
            data = [values]
            return json.loads(json_util.dumps(data))
        else:
            return "Not found any profit."

class Statatics(MethodView):
    def get(self, time):
        if time == 'week':
            ranges = 8
            days = 1
        elif time == 'month':
            ranges = 5
            days = 7
        elif time == 'quarter':
            ranges = 4
            days = 30
        elif time == 'year':
            ranges = 13
            days = 30

        data = []
        for i in reversed(range(1, ranges)):
            s = i * days
            e = s - days + 1
            start_date = datetime.today() - timedelta(days=s)
            end_date = datetime.today() - timedelta(days=e)
            cursor_order = order_collection.find({"createdAt": {"$gte": start_date, "$lt": end_date}})
            cursor_impt = import_collection.find({"createdAt": {"$gte": start_date, "$lt": end_date}})
            
            if cursor_order and cursor_impt:
                values = statics_func(cursor_order, cursor_impt, start_date, end_date)
                data.append(values)
            else:
                default_values = {
                    "start": start_date, 
                    "end": end_date, 
                    "profit": 0, 
                    "perprofit": 0,
                    "order_total": 0,
                    "impt_total": 0,
                }
                data.append(default_values)

        
        if data:
            return json.loads(json_util.dumps(data))
        else:
            return "Not found any profit."



class Statatics_years(MethodView):
    def post(self):
        if request.json:
            ranges = int(request.json.get('times')) + 1
            days = 365

            data = []
            for i in reversed(range(1, ranges)):
                s = i * days
                e = s - days + 1
                start_date = datetime.today() - timedelta(days=s)
                end_date = datetime.today() - timedelta(days=e)
                cursor_order = order_collection.find({"createdAt": {"$gte": start_date, "$lt": end_date}})
                cursor_impt = import_collection.find({"createdAt": {"$gte": start_date, "$lt": end_date}})
                
                if cursor_order and cursor_impt:
                    values = statics_func(cursor_order, cursor_impt, start_date, end_date)
                    data.append(values)
                else:
                    default_values = {
                        "start": start_date, 
                        "end": end_date, 
                        "profit": 0, 
                        "perprofit": 0,
                        "order_total": 0,
                        "impt_total": 0,
                    }
                    data.append(default_values)

            
            if data:
                return json.loads(json_util.dumps(data))
            else:
                return "Not found any profit."


# food
class food_statatics_by_time(MethodView):
    def get(self, id, time):
        if time == 'day':
            days = 1
        if time == 'week':
            days = 7
        if time == 'month':
            days = 30
        if time == 'year':
            days = 365

        start_date = datetime.today() - timedelta(days=days)
        end_date = datetime.today()
        cursor_order = order_collection.find({
            "createdAt": {"$gte": start_date, "$lt": end_date},
            "detail.food._id.$oid": id 
        })
        if cursor_order:
            values = food_statics_func(cursor_order, start_date, end_date)
            return json.loads(json_util.dumps([values]))
        else:
            return "Not found any profit."



class Food_profit_option(MethodView):
    def post(self):
        if request.json:
            id = request.json.get('id')
            start = request.json.get('start')
            start_date = datetime.strptime(start[0:10], "%Y-%m-%d")
            end = request.json.get('end')
            end_date = datetime.strptime(end[0:10], "%Y-%m-%d")

        cursor_order = order_collection.find({"createdAt": {"$gte": start_date, "$lt": end_date}, 
                                              "detail.food._id.$oid": id })
        if cursor_order:
            values = food_statics_func(cursor_order, start_date, end_date)
            data = [values]
            return json.loads(json_util.dumps(data))
        else:
            return "Not found any profit."


class Food_statatics(MethodView):
    def get(self,id, time):
        if time == 'week':
            ranges = 8
            days = 1
        elif time == 'month':
            ranges = 5
            days = 7
        elif time == 'quarter':
            ranges = 4
            days = 30
        elif time == 'year':
            ranges = 13
            days = 30

        data = []
        for i in reversed(range(1, ranges)):
            s = i * days
            e = s - days + 1
            start_date = datetime.today() - timedelta(days=s)
            end_date = datetime.today() - timedelta(days=e)
            cursor_order = order_collection.find({"createdAt": {"$gte": start_date, "$lt": end_date},
                                                  "detail.food._id.$oid": id })
            
            if cursor_order:
                values = food_statics_func(cursor_order, start_date, end_date)
                data.append(values)
            else:
                default_values = {
                    "start": start_date, 
                    "end": end_date, 
                    "profit": 0, 
                    "perprofit": 0,
                    "order_total": 0,
                    "impt_total": 0,
                }
                data.append(default_values)

        
        if data:
            return json.loads(json_util.dumps(data))
        else:
            return "Not found any profit."



class Food_statatics_years(MethodView):
    def post(self):
        if request.json:
            id = request.json.get('id')
            ranges = int(request.json.get('times')) + 1
            days = 365

            data = []
            for i in reversed(range(1, ranges)):
                s = i * days
                e = s - days + 1
                start_date = datetime.today() - timedelta(days=s)
                end_date = datetime.today() - timedelta(days=e)
                cursor_order = order_collection.find({"createdAt": {"$gte": start_date, "$lt": end_date},
                                                      "detail.food._id.$oid": id })
                
                if cursor_order:
                    values = food_statics_func(cursor_order, start_date, end_date)
                    data.append(values)
                else:
                    default_values = {
                        "start": start_date, 
                        "end": end_date, 
                        "profit": 0, 
                        "perprofit": 0,
                        "order_total": 0,
                        "impt_total": 0,
                    }
                    data.append(default_values)

            
            if data:
                return json.loads(json_util.dumps(data))
            else:
                return "Not found any profit."


app.add_url_rule('/api/satatics/profit/<time>', view_func=Profit_in_day.as_view("profit"))
app.add_url_rule('/api/satatics/<time>', view_func=Statatics.as_view("statatics"))
app.add_url_rule('/api/satatics/years', view_func=Statatics_years.as_view("statatics_years"))
app.add_url_rule('/api/satatics/option', view_func=Profit_option.as_view("statatics_option"))

app.add_url_rule('/api/satatics/food/<id>/<time>', view_func=food_statatics_by_time.as_view("food_statatics_by_time"))
app.add_url_rule('/api/satatics/food/<id>/by/<time>', view_func=Food_statatics.as_view("food_statatics"))
app.add_url_rule('/api/satatics/food/years', view_func=Food_statatics_years.as_view("food_statatics_years"))
app.add_url_rule('/api/satatics/food/option', view_func=Food_profit_option.as_view("food_statatics_option"))