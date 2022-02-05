# from email import message
from datetime import datetime
from flask import Blueprint, jsonify, request, session

from flask_login import current_user
from app.models import db, Bill, Comment

comment_routes = Blueprint('comments', __name__)

# get comments for bill
@comment_routes.route("/bills/<int:billId>")
def get_comments(billId):
    comments = Comment.query.filter(Comment.bill_id == billId).all()
    print("<><><><><><><>",{"comments": [comment.to_dict() for comment in comments]})
    return {"comments": [comment.to_frontend_dict() for comment in comments]}
    # return jsonify(comments)


# post comment for bill
@comment_routes.route("/bills/<int:billId>", methods=["POST"])
def post_comment(billId):
    message = request.json["message"]
    user_id = request.json["user_id"]
    # user_id = session["id"] to be used once front end is ready
    comment = Comment(user_id=user_id, bill_id=billId, message=message)
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()


# update comment
@comment_routes.route("/<int:id>", methods=["PUT"])
def update_comment(id):
    comment = Comment.query.get(id)
    comment.message = request.json['message']
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()


# delete comment
@comment_routes.route("/<int:id>", methods=["DELETE"])
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {"message": "destoyed"}
