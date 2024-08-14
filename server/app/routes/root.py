from app import app
from markupsafe import escape
from flask import redirect, url_for

@app.route('/')
def hello():
    return 'Welcome to FoodOpt server'

# @app.errorhandler(404)
# def page_not_found(error):
#         return redirect(url_for("hello"))