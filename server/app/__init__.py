from flask import Flask
app = Flask(__name__)

from app.services import *
from app.controllers import *
from app.routes import *