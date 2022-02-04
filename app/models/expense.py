from .db import db

def mydefault(context):
    return context.get_current_parameters()['initial_charge']


class Expense(db.Model):
    __tablename__ = "expenses"

    id = db.Column(db.Integer, primary_key=True)
    payer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    bill_id = db.Column(db.Integer, db.ForeignKey("bills.id"), nullable=False)
    initial_charge = db.Column(db.Numeric(10,2), nullable=False)
    amount_due = db.Column(db.Numeric(10,2), nullable=False, default=mydefault)
    settled = db.Column(db.Boolean, default=False)

    payer = db.relationship("User", back_populates="expenses")
    bill = db.relationship("Bill", back_populates="expenses")
    transaction_records = db.relationship("TransactionRecord", back_populates="expense", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'payer_id': self.payer_id,
            'bill_id': self.bill_id,
            'initial_charge': self.initial_charge,
            'amount_due': self.amount_due,
            'settled': self.settled,
        }
