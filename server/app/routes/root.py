from app import app
from markupsafe import escape
from flask import redirect, url_for

@app.route('/')
def hello():
    return 'Welcome to FoodIdea server'

@app.route('/<name>')
def welcome(name):
    return f'Welcome {escape(name)}'

@app.errorhandler(404)
def page_not_found(error):
        return redirect(url_for("hello"))