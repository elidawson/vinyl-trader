from models import *
from flask import request, make_response
from config import app, db, api, Resource, migrate

@app.route('/')
def hello():
    return 'hello from flask!'

class Users( Resource ):
    def get( self ):
        users = [ user.to_dict() for user in User.query.all() ]
        res = make_response(users, 200)
        return res

api.add_resource(Users, '/users')

if __name__ == '__main__':
    app.run(port=5555, debug=True)