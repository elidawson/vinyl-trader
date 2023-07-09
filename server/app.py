from models import Favorite, Comment, User, Record
from flask import request, make_response
from flask_restful import Api, Resource
from config import app, db, api, Resource, migrate
from models import *

@app.route('/')
def hello():
    return 'hello from flask!'

if __name__ == '__main__':
    app.run(port=5555, debug=True)