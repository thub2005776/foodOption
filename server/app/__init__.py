from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

app = Flask(__name__, static_folder='static')

CORS = CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000", "http://localhost:3001"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True
    }
})


from app.routes import *
from app.db_connection import *