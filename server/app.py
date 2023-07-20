from models import *
from flask import request, make_response, session
from config import app, db, api, Resource, migrate

app.secret_key = 'BAD_SECRET_KEY'

############### AUTH ################
class CheckSession( Resource ):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return make_response({'message': '401: Not Authorized'}, 401)

api.add_resource(CheckSession, '/api/check_session')

class Login( Resource ):
    def post(self):
        try:
            user = User.query.filter(
            User.username == request.get_json()["username"]).first()

            password = request.get_json()['password']
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(only=('id', 'username', 'name', 'location')), 200
        except: 
            raise ValueError('incorrect username or password', 404)
        return make_response({'error': 'Invalid username or password'}, 401)

api.add_resource(Login, '/api/login')

class Logout( Resource ):
    def delete(self):
        session['user_id'] = None
        return make_response({'message': 'user logged out'}, 204)

api.add_resource(Logout, '/api/logout')

class Signup( Resource ):
    def post(self):
        rq = request.get_json()
        user = User(
            username = rq.get('username'),
            _password_hash = rq.get('password')
        )
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return make_response(user.to_dict(only=('id', 'username', 'name', 'location')), 200)

api.add_resource(Signup, '/api/signup')

############### USERS #################
class Users( Resource ):
### GET USERS ###
    def get( self ):
        try:
            users = [ user.to_dict() for user in User.query.all() ]
            return make_response(users, 200)
        except:
            return make_response({"error": "failed to fetch users"}, 409)

api.add_resource(Users, '/api/users')

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

api.add_resource(UsersbyId, '/api/users/<int:id>')

############## RECORDS ################
class Records( Resource ):
### GET RECORDS ###
    def get( self ):
        try:
            records = [ record.to_dict() for record in Record.query.all() ]
            return make_response(records, 200)
        except:
            return make_response({"error": "failed to fetch records"}, 409)

    def post ( self ):
        rq = request.get_json()
        try:
            record = Record(
                title=rq['title'],
                artist=rq['artist'], 
                description=rq['description'], 
                image=rq['image'],
                user_id=rq['user_id']
            )
            db.session.add(record)
            db.session.commit()
            return make_response(record, 201)
        except:
            return make_response({"error": ["validation errors"]}, 400)

api.add_resource(Records, '/api/records')

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

api.add_resource(RecordsById, '/api/records/<int:id>')

############## COMMENTS ##############
class Comments( Resource ):
    def get( self ):
        comments = [ comment.to_dict() for comment in Comment.query.all() ]
        return make_response(comments, 200)
    
    def post( self ):
        rq = request.get_json()
        try:
            comment = Comment(
                body=rq['body'],
                record_id=rq['record_id'],
                user_id=rq['user_id']
            )
            db.session.add(comment)
            db.session.commit()
            return make_response(comment.to_dict(), 201)
        except:
            return make_response({"error": ["validation errors"]}, 400)

api.add_resource(Comments, '/api/comments')

class CommentsById( Resource ):
    def delete( self, id ):
        comment = Comment.query.filter_by(id=id).first()
        try:
            db.session.delete(comment)
            db.session.commit()
            return make_response({}, 204)
        except:
            return make_response({"error": "user not found"}, 404)
        
    def patch( self, id ):
        comment = Comment.query.filter_by(id=id).first()
        if not comment:
            return make_response({"error": "comment not found"}, 404)
        try:
            for attr in request.get_json():
                setattr(comment, attr, request.get_json()[attr])
            db.session.add(comment)
            db.session.commit()
            return make_response(comment.to_dict(), 200)
        except:
            return make_response({"error": "failed to patch"}, 400)

api.add_resource(CommentsById, '/api/comments/<int:id>')

class Favorites( Resource ):
    def get( self ):
        favorites = [ favorite.to_dict() for favorite in Favorite.query.all() ]
        return make_response(favorites, 200)

    def post( self ):
        rq = request.get_json()
        try:
            favorite = Favorite(
                user_id=rq['user_id'],
                record_id=rq['record_id']
            )
            db.session.add(favorite)
            db.session.commit()
            return make_response(favorite.to_dict(), 201)
        except:
            return make_response({"error": ["validation errors"]}, 400)


api.add_resource(Favorites, '/api/favorites')

class FavoritesById( Resource ):
    def delete( self, id ):
        favorite = Favorite.query.filter_by(id=id).first()
        try:
            db.session.delete(favorite)
            db.session.commit()
            return make_response({}, 204)
        except:
            return make_response({"error": "user not found"}, 404)

api.add_resource(FavoritesById, '/api/favorites/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
