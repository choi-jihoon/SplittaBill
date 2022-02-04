from datetime import datetime
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
