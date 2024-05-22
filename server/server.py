from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv
import os

app = Flask(__name__)

# Tải các biến môi trường từ tệp .env
load_dotenv()

# Thiết lập kết nối với MongoDB
client = MongoClient(os.getenv('MONGO_URL'))
db = client[os.getenv('DATABASE_NAME')]

@app.route('/')
def hello():
    return "Hello, foodIdea server"

if __name__ == '__main__' and db.get_collection:
    app.run(debug=True, port=5000)