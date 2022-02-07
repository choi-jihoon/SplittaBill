from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Friend

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/balance')
@login_required
def get_user_balance(id):
    friends = Friend.query.filter(Friend.user_id == id).all()
    friends_balances = [friend.balance for friend in friends]
    user_balance = sum(friends_balances)
    print("BALANCE!!!!!!!!!!!!!", user_balance)
    return { 'user_balance': str(user_balance) }
