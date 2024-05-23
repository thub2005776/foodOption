
from pymongo import MongoClient
from dotenv import load_dotenv
import os

from app import app

# Tải các biến môi trường từ tệp .env
load_dotenv()

# Thiết lập kết nối với MongoDB
client = MongoClient(os.getenv('MONGO_URL'))
db = client[os.getenv('DATABASE_NAME')]


if __name__ == '__main__' and db.get_collection:
    app.run(debug=True)