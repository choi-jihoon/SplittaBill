from datetime import datetime
from .db import db

class TransactionRecord(db.Model):
    __tablename__ = "transaction_records"

    id = db.Column(db.Integer, primary_key=True)
    payer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    expense_id = db.Column(db.Integer, db.ForeignKey("expenses.id"), nullable=False)
    amount_paid = db.Column(db.Numeric(10,2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    payer = db.relationship("User", foreign_keys=[payer_id])
    recipient = db.relationship("User", foreign_keys=[recipient_id])

    expense = db.relationship("Expense", back_populates="transaction_records")

    def to_dict(self):
        return {
            'id': self.id,
            'payer_id': self.payer_id,
            'payer_name': self.payer.username,
            'recipient_id': self.recipient_id,
            'recipient_name': self.recipient.username,
            'expense_id': self.expense_id,
            'amount_paid': str(self.amount_paid),
            'created_at': self.created_at,
        }
