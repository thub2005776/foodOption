from app import app
from markupsafe import escape

@app.route('/')
def hello():
    return 'Welcome to FoodIdea server'

@app.route('/<name>')
def welcome(name):
    return f'Welcome {escape(name)}'

