from app import app
import json
from bson import json_util
from app.db_connection import db
user_collection = db['users']

@app.route('/api/user')
def get_all_user():
    cursor = user_collection.find()
    return json.loads(json_util.dumps(cursor))