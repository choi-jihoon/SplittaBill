from datetime import datetime
from .db import db


class Bill(db.Model):
    __tablename__ = "bills"

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    total_amount = db.Column(db.Numeric(10,2), nullable=False)
    description = db.Column(db.String, nullable=False)
    deadline = db.Column(db.Date)
    created_at = db.Column(db.DateTime, default=datetime.now())

    owner = db.relationship("User", back_populates="bills")
    comments = db.relationship("Comment", back_populates="bill", cascade="all, delete")
    expenses = db.relationship("Expense", back_populates="bill", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'total_amount': self.total_amount,
            'description': self.description,
            'deadline': self.deadline,
            'created_at': self.created_at,
        }