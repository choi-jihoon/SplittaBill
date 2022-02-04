from email import message
from flask import Blueprint, jsonify, request, session
from flask_login import current_user
from app.models import db, Bill, Comment

comment_routes = Blueprint('comments', __name__)

# get comments for bill
@comment_routes.route("/bills/<int:billId>")
def get_comments(billId):
    print("TEST")
    comments = Comment.query.filter(Comment.bill_id == billId).all()
    print({"comments": [comment.to_dict() for comment in comments]})
    return {"comments": [comment.to_dict() for comment in comments]}

# post comment for bill
@comment_routes.route("/bills/<int:billId>", methods=["POST"])
def post_comment(billId):
    print("current_user: ", current_user)
    # user_id = request.body["user_id"]
    # print(user_id)
    print("<><><><><><><><>",session)
    print("<><><><><><><><>",request.json["message"])
    message = request.json["message"]
    comment = Comment(user_id=current_user, bill_id=billId, message=message)
    db.session.add(comment)
    db.session.commit()
# update comment

# delete comment
# <SecureCookieSession {'csrf_token': '14b06aafeee2ccf4a223453ebd19c8ab7e36179a', '_fresh': False}
# <SecureCookieSession {'csrf_token': '14b06aafeee2ccf4a223453ebd19c8ab7e36179a', '_fresh': False}
