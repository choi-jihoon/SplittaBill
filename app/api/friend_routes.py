from flask import Blueprint
from app.models import db, User, Friend
from flask_login import current_user, login_required

friend_routes = Blueprint('friend', __name__)

@friend_routes.route('/')
@login_required
def get_friends():
    friends = Friend.query.filter(Friend.user_id == current_user.id).all()
    return { "friends": [friend.to_dict() for friend in friends] }
