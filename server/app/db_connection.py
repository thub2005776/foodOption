from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# Thiết lập kết nối với MongoDB
client = MongoClient(os.getenv('MONGO_URL'))
db = client[os.getenv('DATABASE_NAME')]