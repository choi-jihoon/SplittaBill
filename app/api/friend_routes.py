from flask import Blueprint
from app.models import db, User, Friend
from flask_login import current_user

friend_routes = Blueprint('friend', __name__)

@friend_routes.route('/')
def get_friends():
    friends = Friend.query.filter(Friend.user_id == current_user.get_id()).all()
    return { "friends": [friend.to_dict() for friend in friends] }
