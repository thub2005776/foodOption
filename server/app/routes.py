from app import app

@app.route('/')
def hello():
    return 'Welcome to FoodIdea server'

@app.route('/<name>')
def welcome(name):
    return f'Welcome {name}'