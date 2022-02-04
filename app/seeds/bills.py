from app.models import db, Bill, Expense, Friend, Comment

def seed_bills():
    bill1 = Bill(owner_id=1, total_amount=75, description="Groceries")

    expense11 = Expense(payer_id=1, bill_id=1, initial_charge=25, amount_due=0, settled=True)
    expense12 = Expense(payer_id=2, bill_id=1, initial_charge=25)
    expense13 = Expense(payer_id=3, bill_id=1, initial_charge=25)

    friend12 = Friend.query.get(1)
    friend12.balance = 25
    friend21 = Friend.query.get(2)
    friend21.balance = -25

    friend13 = Friend.query.get(3)
    friend13.balance = 25
    friend31 = Friend.query.get(4)
    friend31.balance = -25

    comment1 = Comment(user_id=1, bill_id=1, message="Pay me back NICK!")

    db.session.add(bill1)
    db.session.add(expense11)
    db.session.add(expense12)
    db.session.add(expense13)
    db.session.add(comment1)

    db.session.commit()

def undo_bills():
    db.session.execute('TRUNCATE bills RESTART IDENTITY CASCADE;')
    db.session.commit()
