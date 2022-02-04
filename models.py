from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

# friends = db.Table('friends',
#     db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#     db.Column('friend_id', db.Integer, db.ForeignKey('users.id'), primary_key=True))

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
            # "friends": [friend for friend in self.user_friends],
            # "bills": [bill.to_dict() for bill in self.bills],
            # "expenses": self.expenses,
            # "comments": self.comments
        }

    bills = db.relationship("Bill", back_populates="owner")
    expenses = db.relationship("Expense", back_populates="payer")
    comments = db.relationship("Comment", back_populates="user")



class Friend(db.Model):
    __tablename__ = "friends"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    friend_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    balance = db.Column(db.Numeric(10,2), default=0)

    user = db.relationship("User", foreign_keys=[user_id])
    friend = db.relationship("User", foreign_keys=[friend_id])

    def to_dict(self):
        return {
            "friend_name": self.friend.username,
            "balance": float(self.balance)
        }


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


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    bill_id = db.Column(db.Integer, db.ForeignKey("bills.id"), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

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
            'recipient_id': self.recipient_id,
            'expense_id': self.expense_id,
            'amount_paid': self.amount_paid,
            'created_at': self.created_at,
        }
