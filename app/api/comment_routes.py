# from email import message
from datetime import datetime
from flask import Blueprint, jsonify, request, session

from flask_login import current_user
from app.models import db, Bill, Comment

comment_routes = Blueprint('comments', __name__)

# get comments for bill
@comment_routes.route("/bills/<int:bill_id>")
def get_comments(bill_id):
    comments = Comment.query.filter(Comment.bill_id == bill_id).all()
    print("ROUTE LINE 14",{bill_id: [comment.to_frontend_dict() for comment in comments]})
    if len(comments):
        return {bill_id: [comment.to_frontend_dict() for comment in comments]}
    else: return {"message": "None"}


# post comment for bill
@comment_routes.route("/bills/<int:bill_id>", methods=["POST"])
def post_comment(bill_id):
    message = request.json["message"]
    comment = Comment(user_id=current_user.get_id(), bill_id=bill_id, message=message)
    db.session.add(comment)
    db.session.commit()
    # print(comment.to_frontend_dict())
    print({bill_id: comment.to_frontend_dict()})
    return comment.to_frontend_dict()


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
