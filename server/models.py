from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    record_id = db.Column(db.Integer, db.ForeignKey('records.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship('User', back_populates='favorites')

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

    def __init__(self, title, artist, release_year=None, condition=None):
        self.title = title
        self.artist = artist
        self.release_year = release_year
        self.condition = condition
        self.image = 'https://as2.ftcdn.net/jpg/00/62/08/95/220_F_62089548_hUsAVnxJKkwmMpqgalL4zhwXjwTqP4Vx.jpg'
        self.like_count = 0

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password_hash= db.Column(db.String, nullable=False)
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
