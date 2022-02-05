from datetime import datetime

from app.models.user import User
from .db import db

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    bill_id = db.Column(db.Integer, db.ForeignKey("bills.id"), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    # updated_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship("User", back_populates="comments")
    bill = db.relationship("Bill", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'bill_id': self.bill_id,
            'message': self.message,
            'created_at': self.created_at,
        }
    def to_frontend_dict(self):
        user = User.query.get(self.user_id)
        username = user.username
        # strftime = datetime.strftime()
        created_at = self.created_at.strftime("%m/%d/%Y at %I:%M:%S%p")
        return {
            "id": self.id,
            "username": username,
            "bill_id": self.bill_id,
            "message": self.message,
            "created_at": created_at
        }
