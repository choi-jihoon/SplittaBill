from flask import Blueprint, request
from flask_login import current_user
from app.models import db, User, Friend
from app.forms import AddFriendForm

friend_routes = Blueprint('friend', __name__)

@friend_routes.route('/')
def get_friends():
    friends = Friend.query.filter(Friend.user_id == current_user.get_id()).all()
    return { "friends": [friend.to_dict() for friend in friends] }


@friend_routes.route('/friend', methods=["POST"])
def add_friend(id):
    form = AddFriendForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        friend_user = Friend.query.filter(Friend.username == form.data['username']).first()

        new_friend = Friend(
            user_id=current_user.get_id(),
            friend_id=friend_user.id
        )

        db.session.add(new_friend)
        db.session.commit()
        return {"friend": new_friend.to_dict()}
