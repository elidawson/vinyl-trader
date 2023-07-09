from models import Favorite, Comment, User, Record, db
from flask import Flask, request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
db.init_app(app)

migrate = Migrate(app, db)

if __name__ == '__main__':
    app.run(port=5555, debug=True)