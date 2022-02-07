from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, TransactionRecord

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


@user_routes.route('/<int:id>/transaction_records')
def get_relating_records(id):
    records1 = TransactionRecord.query.filter(TransactionRecord.payer_id == current_user.get_id(),
        TransactionRecord.recipient_id == id)

    records2 = TransactionRecord.query.filter(TransactionRecord.payer_id == id,
        TransactionRecord.recipient_id == current_user.get_id())

    records = records1.union(records2).all()

    return {'transaction_records': [record.to_dict() for record in records]}
