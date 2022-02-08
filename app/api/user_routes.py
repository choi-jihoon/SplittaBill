
from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.aws_s3 import allowed_file, get_unique_filename, upload_file_to_s3
from app.models import User, db, Friend, TransactionRecord
from app.forms import UpdateImage

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


@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def updateUserImage(id):
    user = User.query.get(id)
    form = UpdateImage()
    form['csrf_token'].data = request.cookies['csrf_token']
    image = form["image"].data
    if not allowed_file(image.filename):
        return {"errors": "file type not allowed"}, 400
    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]
    if form.validate_on_submit():
        user.image=url
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/<int:id>/balance')
@login_required
def get_user_balance(id):
    friends = Friend.query.filter(Friend.user_id == id).all()
    friends_balances = [friend.balance for friend in friends]
    user_balance = sum(friends_balances)
    print("BALANCE!!!!!!!!!!!!!", user_balance)
    return { 'user_balance': str(user_balance) }



@user_routes.route('/<int:id>/transaction_records')
def get_relating_records(id):
    records1 = TransactionRecord.query.filter(TransactionRecord.payer_id == current_user.get_id(),
        TransactionRecord.recipient_id == id)

    records2 = TransactionRecord.query.filter(TransactionRecord.payer_id == id,
        TransactionRecord.recipient_id == current_user.get_id())

    records = records1.union(records2).all()

    return {'transaction_records': [record.to_dict() for record in records]}

