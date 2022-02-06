# from email import message
from datetime import datetime
from flask import Blueprint, jsonify, request, session
from flask_login import current_user
from app.models import db, Bill, Comment
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

# get comments for bill
@comment_routes.route("/bills/<int:bill_id>")
def get_comments(bill_id):
    comments = Comment.query.filter(Comment.bill_id == bill_id).all()
    print("ROUTE LINE 14",{bill_id: {comment.id: comment.to_frontend_dict() for comment in comments}})
    print(comments)
    if len(comments):
        return {bill_id: {comment.id: comment.to_frontend_dict() for comment in comments}}
    else: return {bill_id: {}}


# post comment for bill
@comment_routes.route("/bills/<int:bill_id>", methods=["POST"])
def post_comment(bill_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    message = form['message'].data
    if form.validate_on_submit():
        comment = Comment(user_id=current_user.get_id(), bill_id=bill_id, message=message)
        db.session.add(comment)
        db.session.commit()
        print({bill_id: comment.to_frontend_dict()})
        return {comment.id: comment.to_frontend_dict()}
    return {'errors': form.errors}


# update comment
@comment_routes.route("/<int:id>", methods=["PUT"])
def update_comment(id):
    print("<><><><>HIT ROUTE<><><><>")
    form = CommentForm()
    print("<><><><>HIT ROUTE 2<><><><>")
    form['csrf_token'].data = request.cookies['csrf_token']
    print("<><><><>HIT ROUTE 3<><><><>")
    if form.validate_on_submit():
        print("<><><><>HIT ROUTE 4<><><><>")
        comment = Comment.query.get(int(id))
        print("BEFORE: ",comment.message)
        comment.message = form['message'].data
        print("AFTER: ",comment.message)
        db.session.add(comment)
        db.session.commit()
        return comment.to_frontend_dict()
    return {'errors': form.errors}


# delete comment
@comment_routes.route("/<int:id>", methods=["DELETE"])
def delete_comment(id):
    data = {}
    comment = Comment.query.get(id)
    data["comment"] = comment.to_frontend_dict()
    db.session.delete(comment)
    db.session.commit()
    return data
