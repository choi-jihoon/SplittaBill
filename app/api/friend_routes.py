from flask import Blueprint, request
from flask_login import current_user
from app.models import db, User, Friend
from app.forms import AddFriendForm
from .auth_routes import validation_errors_to_error_messages

friend_routes = Blueprint('friend', __name__)

@friend_routes.route('/')
def get_friends():
    friends = Friend.query.filter(Friend.user_id == current_user.get_id()).all()
    return { "friends": [friend.to_dict() for friend in friends] }


@friend_routes.route('/', methods=["POST"])
def add_friend():
    form = AddFriendForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        friend_user = User.query.filter(User.username == form.data['username']).first()

        new_friend1 = Friend(
            user_id=current_user.get_id(),
            friend_id=friend_user.id
        )

        new_friend2 = Friend(
            user_id=friend_user.id,
            friend_id=current_user.get_id()
        )

        db.session.add(new_friend1)
        db.session.add(new_friend2)
        db.session.commit()
        return {"friend": new_friend1.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@friend_routes.route('/<int:id>', methods=["DELETE"])
def remove_friend(id):
    friend = Friend.query.get(id)
    if friend:
        db.session.delete(friend)
        db.session.commit()
        return {'message': 'successfully deleted'}
