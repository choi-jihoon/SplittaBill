from decimal import Decimal
from app.models import db, TransactionRecord, Expense, Friend

def seed_transactions():
    transaction1 = TransactionRecord(payer_id=2, recipient_id=1, expense_id=2, amount_paid=0.01)
    db.session.add(transaction1)
    db.session.commit()

    expense_to_update = Expense.query.get(2)
    expense_to_update.amount_due -= Decimal(0.01)

    friend1 = Friend.query.get(1)
    friend2 = Friend.query.get(2)

    friend1.balance -= Decimal(0.01)
    friend2.balance += Decimal(0.01)

    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE transaction_records RESTART IDENTITY CASCADE;')
    db.session.commit()
