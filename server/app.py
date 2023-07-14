from models import *
from flask import request, make_response, session
from config import app, db, api, Resource, migrate

app.secret_key = 'BAD_SECRET_KEY'

@app.route('/')
def hello():
    return 'hello from flask!'

############### AUTH ################
class CheckSession( Resource ):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict(only=('id', 'username', 'name', 'location'))
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')

class Login( Resource ):
    def post(self):
        user = User.query.filter(
        User.username == request.get_json()["username"]).first()

        password = request.get_json()['password']
        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(only=('id', 'username', 'name', 'location')), 200

        return {'error': 'Invalid username or password'}, 401

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message': 'user logged out'}, 204

api.add_resource(Logout, '/logout')

############### USERS #################
class Users( Resource ):
### GET USERS ###
    def get( self ):
        try:
            users = [ user.to_dict() for user in User.query.all() ]
            return make_response(users, 200)
        except:
            return make_response({"error": "failed to fetch users"}, 409)

api.add_resource(Users, '/users')

class UsersbyId( Resource ):
### GET USER ID ##
    def get ( self, id ):
        try: 
            user = User.query.filter_by(id=id).first()
            return make_response(user.to_dict(), 200)
        except:
            return make_response({"error": "user not found"}, 404)

### PATCH USER ###
    def patch( self, id ):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"error": "user not found"}, 404)
        try:
            for attr in request.get_json():
                setattr(user, attr, request.get_json()[attr])
            db.session.add(user)
            db.session.commit()
            user_dict = user.to_dict(only=('id', 'username', 'name', 'location', 'bio', 'updated_at'))
            return make_response(user_dict, 200)
        except:
            return make_response({"error": "failed to patch"}, 400)

### DELETE USER ###
    def delete( self, id ):
        user = User.query.filter_by(id=id).first()
        try:
            db.session.delete(user)
            db.session.commit()
            return make_response({}, 204)
        except:
            return make_response({"error": "user not found"}, 404)

api.add_resource(UsersbyId, '/users/<int:id>')

############## RECORDS ################
class Records( Resource ):
### GET RECORDS ###
    def get( self ):
        try:
            records = [ record.to_dict() for record in Record.query.all() ]
            return make_response(records, 200)
        except:
            return make_response({"error": "failed to fetch records"}, 409)

api.add_resource(Records, '/records')

class RecordsById( Resource ):
### GET RECORD ID ###
    def get( self, id ):
        try:
            record = Record.query.filter_by(id=id).first()
            return make_response(record.to_dict(), 200)
        except:
            return make_response({"error": "record not found"}, 404)

### PATCH RECORD ###
    def patch( self, id ):
        record = Record.query.filter_by(id=id).first()
        if not record:
            return make_response({"error": "record not found"}, 404)
        try:
            for attr in request.get_json():
                setattr(record, attr, request.get_json()[attr])
            db.session.add(record)
            db.session.commit()
            record_dict = record.to_dict(only=('title', 'artist', 'description', 'updated_at'))
            return make_response(record_dict, 200)
        except:
            return make_response({"error": "failed to patch"}, 400)

### DELETE RECORD ###
    def delete( self, id ):
        user = User.query.filter_by(id=id).first()
        try:
            db.session.delete(user)
            db.session.commit()
            return make_response({}, 204)
        except:
            return make_response({"error": "user not found"}, 404)

api.add_resource(RecordsById, '/records/<int:id>')

############## COMMENTS ##############
class Comments( Resource ):
    def get( self ):
        comments = [ comment.to_dict() for comment in Comment.query.all() ]
        res = make_response(comments, 200)
        return res

api.add_resource(Comments, '/comments')

if __name__ == '__main__':
    app.run(port=5555, debug=True)