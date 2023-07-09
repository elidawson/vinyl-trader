from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt

class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    record_id = db.Column(db.Integer, db.ForeignKey('records.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship('User', back_populates='favorites')

    serialize_rules = (
        '-user.favorites',
        '-created_at',
        '-updated_at'
    )

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    record_id = db.Column(db.Integer, db.ForeignKey('records.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    record = db.relationship('Record', back_populates='comments')
    user = db.relationship('User', back_populates='comments')

    serialize_rules = (
        '-record.comments',
        '-created_at',
        '-updated_at'
    )

    @validates('body')
    def validate_body(self, key, input):
        if len(input) > 200:
            raise ValueError('Comments must be shorter than 200 characters')
        return input

class Record(db.Model, SerializerMixin):
    __tablename__ = 'records'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)
    release_year = db.Column(db.Integer)
    condition = db.Column(db.String)
    image = db.Column(db.String)
    like_count = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship('User', back_populates='records')
    comments = db.relationship('Comment', back_populates='record')
    favorited_by = association_proxy('favorites', 'user')

    serialize_rules = (
        '-user.records',
        '-comments.record'
        '-created_at',
        '-updated_at'
    )

    def __init__(self, title, artist, release_year=None, condition=None):
        self.title = title
        self.artist = artist
        self.release_year = release_year
        self.condition = condition
        self.image = 'https://as2.ftcdn.net/jpg/00/62/08/95/220_F_62089548_hUsAVnxJKkwmMpqgalL4zhwXjwTqP4Vx.jpg'
        self.like_count = 0

    @validates('title', 'artist')
    def validate_string_length(self, key, input):
        if len(input) > 40:
            raise ValueError('Title and artist must be shorter than 40 characters')
        return input

    @validates('release_year')
    def validate_release_year(self, key, input):
        if len(str(input)) != 4:
            raise ValueError('Release year must be in YYYY format')
        return input

    @validates('image')
    def validate_image_url(self, key, input):
        if not input.startswith('http'):
            raise ValueError('Enter a valid image URL')
        return input

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash= db.Column(db.String, nullable=False)
    name = db.Column(db.String)
    location = db.Column(db.String)
    bio = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    records = db.relationship('Record', back_populates='user', cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='user', cascade='all, delete-orphan')
    favorite_records = association_proxy('favorites', 'record')

    serialize_rules = (
        '-records.user',
        '-comments.user',
        '-password_hash',
        '-created_at',
        '-updated_at',
    )

    @validates('username', 'name', 'location')
    def validate_string_length(self, key, input):
        if len(input) > 20:
            raise ValueError('must be less than 20 characters')
        return input
    
    @validates('bio')
    def validate_bio_length(self, key, input):
        if len(input) > 200:
            raise ValueError('bio must be shorter than 200 characters')
        return input

    @property
    def password_hash(self):
        raise AttributeError("password_hash is not readable")

    @password_hash.setter
    def password_hash(self, input):
        self._password_hash = bcrypt.generate_password_hash(input.encode('utf-8')).decode('utf-8')
