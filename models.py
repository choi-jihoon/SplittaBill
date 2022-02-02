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

    user_friends = db.relationship("Friend")



class Friend(db.Model):
    __tablename__ = "friends"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    balance = db.Column(db.Numeric(10,2), default=0)

    user_friends = db.relationship("User", back_populates="user_friends")


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


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    bill_id = db.Column(db.Integer, db.ForeignKey("bills.id"), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship("User", back_populates="comments")
    bill = db.relationship("Bill", back_populates="comments")


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
