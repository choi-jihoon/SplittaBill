
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


    bills = db.relationship("Bill", back_populates="owner")
    expenses = db.relationship("Expense", back_populates="payer")
    comments = db.relationship("Comment", back_populates="user")

    payer_transaction_records = db.relationship("TransactionRecord", back_populates="payer")
    recipient_transaction_records = db.relationship("TransactionRecord", back_populates="recipient")

    user_friends = db.relationship(
        'User', secondary=friends,
        primaryjoin=(friends.c.user_id == id),
        secondaryjoin=(friends.c.friend_id == id),
        backref=db.backref('friends', lazy='dynamic'), lazy='dynamic'
    )

friends = db.Table('friends',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('friend_id', db.Integer, db.ForeignKey('users.id'), primary_key=True))



# update balance between me(1) and Viv(2)
# Viv charges me $20
# balance_tracker = BalanceBetweenFriends.query.filter(user_id == 1 and friend_id == 2)
# balance_tracker.balance = -20
# balance_tracker2 = BalanceBetweenFriends.query.filter(user_id == 2 and friend_id == 1)
# balance_tracker.balance = 20

class BalanceBetweenFriends(db.Model):
    user_id = db.Column(db.Integer)
    friend_id = db.Column(db.Integer)
    balance = db.Column(db.Numeric(10,2), default=0)




class Bill(db.Model):
    __tablename__ = "bills"

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    total_amount = db.Column(db.Numeric(10,2), nullable=False)
    description = db.Column(db.String, nullable=False)
    deadline = db.Column(db.Date)
    created_at = db.Column(db.DateTime, default=datetime.now())

    owner = db.relationship("User", back_populates="bills")
    comments = db.relationship("Comment", back_populates="bill")
    expenses = db.relationship("Expense", back_populates="bill")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'total_amount': self.total_amount,
            'description': self.description,
            'deadline': self.deadline,
            'created_at': self.created_at,
        }


class Expense(db.Model):
    __tablename__ = "expenses"

    id = db.Column(db.Integer, primary_key=True)
    payer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    bill_id = db.Column(db.Integer, db.ForeignKey("bills.id"), nullable=False)
    initial_charge = db.Column(db.Numeric(10,2), nullable=False)
    amount_due = db.Column(db.Numeric(10,2), nullable=False, default=initial_charge)
    settled = db.Column(db.Boolean, default=False)

    payer = db.relationship("User", back_populates="expenses")
    bill = db.relationship("Bill", back_populates="expenses")
    transaction_records = db.relationship("TransactionRecord", back_populates="expense")

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

    payer = db.relationship("User", back_populates="payer_transaction_records")
    recipient = db.relationship("User", back_populates="recipient_transaction_records")

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
